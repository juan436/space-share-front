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
    { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
    { featureType: "transit", elementType: "labels", stylers: [{ visibility: "off" }] },
    { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#d4e8f7" }] },
    { featureType: "landscape.natural", elementType: "geometry.fill", stylers: [{ color: "#f0f5f0" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ lightness: 40 }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
  ],
};

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
  const active = isSelected || isHovered;

  return (
    <div
      className={`relative cursor-pointer transition-all duration-200 flex items-center justify-center ${active ? 'z-50 scale-110' : 'z-10 hover:scale-105'
        }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <div
        className={`
          px-3 py-1.5 rounded-full font-bold text-sm whitespace-nowrap w-max
          transition-all duration-200
          ${active
            ? 'bg-primary text-white shadow-[0_4px_16px_rgba(59,130,246,0.35)] border border-primary/50'
            : 'bg-card text-foreground shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-border/60 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]'
          }
        `}
      >
        ${space.pricePerMonth}
      </div>
      {/* Tail */}
      <div
        className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 transition-colors duration-200 ${active ? 'bg-primary border-b border-r border-primary/50' : 'bg-card border-b border-r border-border/60'
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

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    if (bounds && !bounds.isEmpty()) {
      map.fitBounds(bounds);
      setTimeout(() => map.setZoom((map.getZoom() || 12) - 1), 100);
    }
  }, [bounds]);

  const getSpaceCoordinates = (space: Space, index: number) => {
    if (space.location.latitude && space.location.longitude) {
      return { lat: space.location.latitude, lng: space.location.longitude };
    }
    const offsets = [
      { lat: 0.01, lng: 0.02 }, { lat: -0.02, lng: 0.03 },
      { lat: 0.025, lng: -0.015 }, { lat: -0.015, lng: -0.025 },
      { lat: 0.005, lng: -0.04 }, { lat: -0.03, lng: 0.01 },
      { lat: 0.035, lng: 0.015 }, { lat: -0.005, lng: 0.045 },
    ];
    const offset = offsets[index % offsets.length];
    return { lat: defaultCenter.lat + offset.lat, lng: defaultCenter.lng + offset.lng };
  };

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted/30 rounded-2xl">
        <div className="text-center p-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-destructive/10 flex items-center justify-center">
            <MapPin className="w-7 h-7 text-destructive/60" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">Error al cargar el mapa</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
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
          return (
            <OverlayView
              key={space.id}
              position={position}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <SpaceMarker
                space={space}
                isSelected={space.id === selectedSpaceId}
                isHovered={space.id === hoveredSpaceId}
                onClick={() => window.open(`/space/${space.id}`, "_blank")}
                onMouseEnter={() => setHoveredSpaceId(space.id)}
                onMouseLeave={() => setHoveredSpaceId(null)}
              />
            </OverlayView>
          );
        })}
      </GoogleMap>

      {/* Count overlay */}
      <div className="absolute bottom-4 left-4 glass px-3.5 py-2 rounded-xl border border-border/30 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>{spaces.length} espacios</span>
        </div>
      </div>
    </div>
  );
}
