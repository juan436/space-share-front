"use client";

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { MapPin } from "lucide-react";
import { MapSkeleton } from "@/presentation/components/shared/skeletons/MapSkeleton";
import { Space } from "@/core/domain/entities/Space";

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

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Dónde se encuentra</h2>

      {/* Address Info */}
      <div className="flex items-start gap-3">
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
          <MapSkeleton className="h-[300px] rounded-xl" />
        )}
      </div>
    </div>
  );
}
