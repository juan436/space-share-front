"use client";

import { useState, useCallback, useMemo } from "react";
import { GoogleMap, useJsApiLoader, OverlayView } from "@react-google-maps/api";
import { Ruler, MapPin } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";

interface SpacesMapProps {
  spaces: Space[];
  selectedSpaceId?: string;
  onSpaceSelect?: (spaceId: string) => void;
}

const spaceTypeLabels: Record<string, string> = {
  garage: "Garaje",
  basement: "Sótano",
  attic: "Ático",
  storage: "Bodega",
  other: "Otro",
};

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

// Default center (San Salvador, El Salvador)
const defaultCenter = {
  lat: 13.6929,
  lng: -89.2182,
};

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
  scrollwheel: true,
  gestureHandling: 'greedy',
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};

// Custom marker component with image + price
function SpaceMarker({ 
  space, 
  isSelected, 
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: { 
  space: Space;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <div 
      className="relative cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ transform: 'translate(-50%, -100%)' }}
    >
      {/* Expanded Hover Card - shows full details */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 animate-in fade-in zoom-in-95 duration-200 z-50">
          <div className="bg-card rounded-xl shadow-2xl border-2 border-primary/20 overflow-hidden">
            {/* Large Image */}
            <div className="relative w-full h-32 bg-muted">
              {space.images && space.images.length > 0 ? (
                <img
                  src={space.images[0]}
                  alt={space.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                  <Ruler className="w-12 h-12 text-muted-foreground/40" />
                </div>
              )}
              {/* Type badge */}
              <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-md shadow">
                {spaceTypeLabels[space.type] || space.type}
              </div>
            </div>
            {/* Full Info */}
            <div className="p-4">
              <h4 className="font-bold text-base text-foreground line-clamp-2">
                {space.title}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                {space.location.city}, {space.location.state}
              </p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Ruler className="w-4 h-4" />
                  {space.squareMeters} m²
                </span>
                <span className="text-lg font-bold text-primary">
                  ${space.pricePerMonth}<span className="text-sm font-normal text-muted-foreground">/mes</span>
                </span>
              </div>
            </div>
          </div>
          {/* Arrow pointing down */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-card drop-shadow-sm" />
        </div>
      )}

      {/* Compact Marker Card - Image + Price */}
      <div
        className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-200 ${
          isSelected || isHovered
            ? 'ring-2 ring-primary ring-offset-2 scale-110'
            : 'hover:scale-105'
        }`}
        style={{ width: '80px' }}
      >
        {/* Mini Image */}
        <div className="relative w-full h-12 bg-muted">
          {space.images && space.images.length > 0 ? (
            <img
              src={space.images[0]}
              alt={space.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-accent/30">
              <Ruler className="w-5 h-5 text-muted-foreground/50" />
            </div>
          )}
        </div>
        {/* Price Tag */}
        <div
          className={`px-2 py-1.5 text-center font-bold text-sm ${
            isSelected || isHovered
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-foreground'
          }`}
        >
          ${space.pricePerMonth}
        </div>
      </div>
      
      {/* Arrow pointer */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent transition-colors ${
          isSelected || isHovered ? 'border-t-primary' : 'border-t-card'
        }`}
      />
    </div>
  );
}

export function SpacesMap({ spaces, selectedSpaceId, onSpaceSelect }: SpacesMapProps) {
  const [hoveredSpaceId, setHoveredSpaceId] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Calculate bounds to fit all markers
  const bounds = useMemo(() => {
    if (!isLoaded || spaces.length === 0) return null;
    
    const bounds = new google.maps.LatLngBounds();
    spaces.forEach((space) => {
      if (space.location.latitude && space.location.longitude) {
        bounds.extend({ lat: space.location.latitude, lng: space.location.longitude });
      }
    });
    return bounds;
  }, [isLoaded, spaces]);

  // Fit bounds when map loads or spaces change
  const handleMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    if (bounds && !bounds.isEmpty()) {
      map.fitBounds(bounds);
      setTimeout(() => map.setZoom((map.getZoom() || 12) - 1), 100);
    }
  }, [bounds]);

  // Get coordinates for a space (uses real coords if available)
  const getSpaceCoordinates = (space: Space, index: number) => {
    if (space.location.latitude && space.location.longitude) {
      return { lat: space.location.latitude, lng: space.location.longitude };
    }
    // Fallback: spread-out coordinates around San Salvador for demo
    const offsets = [
      { lat: 0.01, lng: 0.02 },
      { lat: -0.02, lng: 0.03 },
      { lat: 0.025, lng: -0.015 },
      { lat: -0.015, lng: -0.025 },
      { lat: 0.005, lng: -0.04 },
      { lat: -0.03, lng: 0.01 },
      { lat: 0.035, lng: 0.015 },
      { lat: -0.005, lng: 0.045 },
    ];
    const offset = offsets[index % offsets.length];
    return {
      lat: defaultCenter.lat + offset.lat,
      lng: defaultCenter.lng + offset.lng,
    };
  };

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
        <div className="text-center p-6">
          <MapPin className="w-12 h-12 text-destructive mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Error al cargar el mapa</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-3"></div>
          <p className="text-sm text-muted-foreground">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={12}
        onLoad={handleMapLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        {spaces.map((space, index) => {
          const position = getSpaceCoordinates(space, index);
          const isSelected = space.id === selectedSpaceId;
          const isHovered = space.id === hoveredSpaceId;

          return (
            <OverlayView
              key={space.id}
              position={position}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <SpaceMarker
                space={space}
                isSelected={isSelected}
                isHovered={isHovered}
                onClick={() => window.open(`/space/${space.id}`, "_blank")}
                onMouseEnter={() => setHoveredSpaceId(space.id)}
                onMouseLeave={() => setHoveredSpaceId(null)}
              />
            </OverlayView>
          );
        })}
      </GoogleMap>

      {/* Spaces count overlay */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{spaces.length} espacios en esta área</span>
        </div>
      </div>
    </div>
  );
}
