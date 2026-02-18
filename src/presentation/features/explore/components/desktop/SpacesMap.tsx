"use client";

import { useState, useCallback, useMemo } from "react";
import { GoogleMap, useJsApiLoader, OverlayView } from "@react-google-maps/api";
import { MapPin } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";

interface SpacesMapProps {
  spaces: Space[];
  selectedSpaceId?: string;
  onSpaceSelect?: (spaceId: string) => void;
}



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
      className={`relative cursor-pointer transition-transform duration-200 flex items-center justify-center ${isSelected || isHovered ? 'z-50 scale-110' : 'z-10 hover:scale-105'
        }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <div
        className={`px-3 py-1.5 rounded-full font-bold text-sm shadow-md border whitespace-nowrap w-max ${isSelected || isHovered
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-card text-foreground border-border'
          }`}
      >
        ${space.pricePerMonth}
      </div>
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
