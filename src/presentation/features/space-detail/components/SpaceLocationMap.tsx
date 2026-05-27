"use client";

import { useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { MapPin, Navigation } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";
import { Button } from "@/presentation/components/ui/button";

interface SpaceLocationMapProps {
  location: Space["location"];
}

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  scrollwheel: true,
  gestureHandling: "greedy",
};

export function SpaceLocationMap({ location }: SpaceLocationMapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const center = {
    lat: location.latitude || 13.6929,
    lng: location.longitude || -89.2182,
  };

  const handleGetDirections = () => {
    const destination = location.latitude && location.longitude
      ? `${location.latitude},${location.longitude}`
      : encodeURIComponent(`${location.address}, ${location.city}, ${location.country}`);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Ubicación</h2>
        <Button variant="outline" size="sm" onClick={handleGetDirections} className="gap-2">
          <Navigation className="w-4 h-4" />
          Cómo llegar
        </Button>
      </div>

      {/* Address Info */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
        <div>
          <p className="font-medium text-foreground">{location.address}</p>
          <p className="text-sm text-muted-foreground">
            {location.city}, {location.state}, {location.country}
          </p>
        </div>
      </div>

      {/* Map */}
      <div className="rounded-xl overflow-hidden border border-border/60">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
            options={mapOptions}
          >
            <Marker position={center} />
          </GoogleMap>
        ) : (
          <div className="w-full h-[300px] bg-muted flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Cargando mapa...</p>
            </div>
          </div>
        )}
      </div>

      {/* Neighborhood Info */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="p-3 rounded-lg bg-white dark:bg-card border border-border/40 shadow-[0_2px_8px_rgba(0,0,0,0.07)]">
          <p className="text-muted-foreground">Zona</p>
          <p className="font-medium">{location.city}</p>
        </div>
        <div className="p-3 rounded-lg bg-white dark:bg-card border border-border/40 shadow-[0_2px_8px_rgba(0,0,0,0.07)]">
          <p className="text-muted-foreground">Departamento</p>
          <p className="font-medium">{location.state}</p>
        </div>
      </div>
    </div>
  );
}
