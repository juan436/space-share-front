"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { GoogleMap, useJsApiLoader, OverlayView } from "@react-google-maps/api";
import { MapPin, Ruler, X } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";
import { spaceTypeColors, mapConfig } from "../../data";
import { spaceTypeLabels } from "@/presentation/types/spaces";

interface MobileMapViewProps {
  spaces: Space[];
  selectedSpace: Space | null;
  onSpaceSelect: (space: Space | null) => void;
  onSpaceDetail: (space: Space) => void;
}

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  scrollwheel: true,
  gestureHandling: 'greedy',
};

export function MobileMapView({ spaces, selectedSpace, onSpaceSelect, onSpaceDetail }: MobileMapViewProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });
  const zoomTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (zoomTimeoutRef.current) clearTimeout(zoomTimeoutRef.current);
    };
  }, []);

  const bounds = useMemo(() => {
    if (!isLoaded || spaces.length === 0) return null;
    const b = new google.maps.LatLngBounds();
    spaces.forEach((space) => {
      if (space.location.latitude && space.location.longitude) {
        b.extend({ lat: space.location.latitude, lng: space.location.longitude });
      }
    });
    return b;
  }, [isLoaded, spaces]);

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    if (bounds && !bounds.isEmpty()) {
      map.fitBounds(bounds);
      zoomTimeoutRef.current = setTimeout(() => map.setZoom((map.getZoom() || 11) - 1), 100);
    }
  }, [bounds]);

  if (!isLoaded) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-muted">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <GoogleMap
        mapContainerClassName="absolute inset-0"
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={mapConfig.defaultCenter}
        zoom={11}
        onLoad={handleMapLoad}
        options={mapOptions}
        onClick={() => onSpaceSelect(null)}
      >
        {spaces.map((space) => {
          if (!space.location.latitude || !space.location.longitude) return null;
          const isSelected = selectedSpace?.id === space.id;
          
          return (
            <OverlayView
              key={space.id}
              position={{ lat: space.location.latitude, lng: space.location.longitude }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <button
                onClick={() => onSpaceSelect(space)}
                className={`px-3 py-1.5 rounded-full font-bold text-sm shadow-lg transition-all ${
                  isSelected
                    ? 'bg-primary text-white scale-110 ring-2 ring-white'
                    : 'bg-white text-foreground'
                }`}
                style={{ transform: 'translate(-50%, -50%)' }}
              >
                ${space.pricePerMonth}
              </button>
            </OverlayView>
          );
        })}
      </GoogleMap>

      {/* Selected Space Card */}
      {selectedSpace && (
        <div className="absolute bottom-4 left-4 right-4 animate-in slide-in-from-bottom duration-200">
          <div 
            className="bg-card rounded-2xl shadow-xl border overflow-hidden"
            onClick={() => window.open(`/space/${selectedSpace.id}`, "_blank")}
          >
            <div className="flex gap-3 p-3">
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0">
                <Ruler className="w-8 h-8 text-muted-foreground/30" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ring-1 ring-inset mb-1 ${spaceTypeColors[selectedSpace.type]}`}>
                  {spaceTypeLabels[selectedSpace.type]}
                </div>
                <h3 className="font-semibold text-sm leading-tight line-clamp-2">{selectedSpace.title}</h3>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{selectedSpace.location.city}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{selectedSpace.squareMeters} m²</span>
                  <span className="font-bold text-primary">${selectedSpace.pricePerMonth}<span className="text-xs font-normal text-muted-foreground">/mes</span></span>
                </div>
              </div>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onSpaceSelect(null);
                }}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-muted/80"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spaces count */}
      <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
        <span className="text-sm font-medium">{spaces.length} espacios</span>
      </div>
    </>
  );
}
