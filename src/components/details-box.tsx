import { memo } from "react";
import { OverlayView } from "@react-google-maps/api";
import type { VehicleLocation } from "@/types/tracking";
import { X } from "lucide-react";
import { formatPlaca } from "@/lib/utils";
import dayjs from "dayjs";

interface DetailsBoxProps {
  vehicle: VehicleLocation;
  onCloseClick: VoidFunction;
}

function DetailsBox({ vehicle, onCloseClick }: DetailsBoxProps) {
  return (
    <OverlayView
      position={{
        lat: vehicle.lat,
        lng: vehicle.lng,
      }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div className="relative transform -translate-x-1/2 -translate-y-[155%] rounded-xl min-w-[230px]">
        <div className="bg-[#041521] text-white rounded-xl p-3 shadow-lg text-sm relative border border-[#0b2e45]">
          <X
            onClick={onCloseClick}
            className="absolute top-1 right-2 text-blue-400 font-bold text-lg"
          />

          <div className="flex flex-col bg-red items-center justify-center pt-1.5">
            <div className="font-poppins font-medium">
              Placa {formatPlaca(vehicle.plate)}
            </div>
            <div className="font-poppins font-medium">
              Frota {vehicle.fleet}
            </div>
            <div className="font-poppins font-medium">
              {dayjs(vehicle.createdAt).format("DD/MM/YYYY")} -{" "}
              {dayjs(vehicle.createdAt).format("HH:mm")}
            </div>
            <a
              href={`https://www.google.com/maps?q=${vehicle.lat},${vehicle.lng}`}
              target="_blank"
              className="font-poppins font-medium underline"
            >
              {vehicle.lat}, {vehicle.lng}
            </a>
          </div>
        </div>

        <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#0b2e45]" />
      </div>
    </OverlayView>
  );
}

export default memo(DetailsBox);
