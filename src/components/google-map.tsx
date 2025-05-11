import { memo, useCallback, useRef, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import DetailsBox from "./details-box";

import type { VehicleLocation } from "../types/tracking";

import { CircleDot } from "lucide-react";
import markerIcon from "@/assets/truck-marker.svg";

interface MapComponentProps {
  vehicles: (VehicleLocation | undefined)[];
}

const initialCenter = { lat: -15.7921, lng: -47.8825 };

const MapComponent = ({ vehicles }: MapComponentProps) => {
  const mapRef = useRef<google.maps.Map | null>(null);

  const [center, setCenter] = useState<{ lat: number; lng: number }>(
    initialCenter
  );
  const [zoom, setZoom] = useState<number>(4);
  const [selectedMarker, setSelectedMarker] = useState<VehicleLocation | null>(
    null
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  const handleClick = useCallback(
    (location: VehicleLocation) => {
      if (selectedMarker?.id === location.id) {
        return setSelectedMarker(null);
      }

      setCenter({ lat: location.lat, lng: location.lng });
      setZoom(11);
      return setSelectedMarker(location);
    },
    [selectedMarker]
  );

  if (!isLoaded)
    return (
      <div className="flex w-full h-[518px] rounded-2xl mt-3 bg-gray-300 items-center justify-center">
        <div className="flex gap-1 items-center">
          <CircleDot className="w-4 h-4 text-gray-600" />
          <CircleDot className="w-4 h-4 text-gray-600" />
          <CircleDot className="w-4 h-4 text-gray-600" />
        </div>
      </div>
    );

  return (
    <div className="w-full h-full pt-3">
      <GoogleMap
        center={center}
        zoom={zoom}
        mapContainerClassName="w-full h-[518px] rounded-2xl"
        onLoad={(map) => {
          mapRef.current = map;
        }}
        options={{
          cameraControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          maxZoom: 20,
          minZoom: 4,
        }}
      >
        {vehicles.map(
          (vehicle, index) =>
            vehicle && (
              <Marker
                key={`${vehicle.id}-${index}`}
                position={{
                  lat: vehicle.lat,
                  lng: vehicle.lng,
                }}
                icon={{
                  url: markerIcon,
                }}
                onClick={() => handleClick(vehicle)}
              >
                {selectedMarker?.id === vehicle.id && (
                  <DetailsBox
                    vehicle={vehicle}
                    onCloseClick={() => setSelectedMarker(null)}
                  />
                )}
              </Marker>
            )
        )}
      </GoogleMap>
    </div>
  );
};

export default memo(MapComponent);
