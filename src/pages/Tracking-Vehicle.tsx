import { useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import FilterSearch from "@/components/filter-search";
import MapComponent from "@/components/google-map";
import InfiniteScroll from "@/components/infinite-scroll";
import VehicleList from "@/components/vehicle-list";

import { formatPlaca } from "@/lib/utils";
import useVehicle from "@/services/hooks/useVehicle";
import { AlertTriangle, CircleDot, Loader, Loader2 } from "lucide-react";

const TrackingPage = () => {
  const scrollRef = useRef<HTMLElement | null>(null);

  const [filter, setFilter] = useState<string>("tracked");
  const [searchValue, setSearchValue] = useState<string>("");

  const queryClient = useQueryClient();
  const {
    data,
    isError,
    isPending,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useVehicle({
    filter,
  });

  const vehicleDataList = useMemo(() => {
    const vehicles = data?.pages.flatMap((page) => page.content.vehicles);

    if (searchValue && searchValue !== "") {
      return vehicles?.filter((vehicle) => {
        const searchUpper = searchValue.toUpperCase();
        const plateFormated = formatPlaca(vehicle.plate).toUpperCase();
        const fleetStr = vehicle.fleet?.toString().toUpperCase() ?? "SEM FROTA";

        if (
          plateFormated.includes(searchUpper) ||
          fleetStr.includes(searchUpper)
        ) {
          return vehicle;
        }
      });
    }

    return vehicles ?? [];
  }, [data, searchValue]);

  const locationList = useMemo(() => {
    const locations = data?.pages.flatMap(
      (page) => page.content.locationVehicles
    );

    if (searchValue && searchValue !== "") {
      return locations?.filter((location) => {
        const searchUpper = searchValue.toUpperCase();
        const plateFormated = formatPlaca(location?.plate).toUpperCase();
        const fleetStr =
          location?.fleet?.toString().toUpperCase() ?? "SEM FROTA";

        if (
          plateFormated.includes(searchUpper) ||
          fleetStr.includes(searchUpper)
        ) {
          return location;
        }
      });
    }

    return locations ?? [];
  }, [data, searchValue]);

  return (
    <div className="w-full h-full bg-[#001e2e]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 z-50 w-full flex bg-[#001e2e] h-12 items-center px-4">
        <span className="text-white font-poppins font-medium">
          Jair Francisco da Silva
        </span>
      </nav>
      <main
        ref={scrollRef}
        className="flex flex-col min-h-screen bg-[#000e17] px-8"
      >
        {isError ? (
          <div className="flex items-center justify-center h-dvh">
            <div className="flex flex-col items-center justify-center gap-4 text-center p-6">
              <AlertTriangle className="w-10 h-10 text-red-500" />
              <p className="text-lg font-medium text-white">
                Estamos tendo alguns problemas técnicos...
              </p>
              <Button
                onClick={() =>
                  queryClient.invalidateQueries({
                    queryKey: ["vehicleData"],
                  })
                }
                className="mt-2 min-w-[200px]"
                disabled={isFetching}
              >
                {isFetching ? (
                  <Loader className="animate-spin" />
                ) : (
                  <p>Tentar novamente</p>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col pt-15 pb-5 gap-y-5">
            {/* Filter + Search */}
            <FilterSearch
              filterValue={filter}
              setFilterValue={setFilter}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />

            <Separator className="bg-[#012d45]" />

            {/* Map */}
            <div className="bg-[#001621] border border-[#012d45] rounded-2xl h-[589px] items-center px-4 py-2">
              <span className="text-white font-poppins font-semibold">
                Mapa rastreador
              </span>
              {isPending ? (
                <div className="flex w-full h-[518px] rounded-2xl mt-3 bg-gray-300 items-center justify-center">
                  <div className="flex gap-1 items-center">
                    <span className="animate-bounce-dot animation-delay-0">
                      <CircleDot className="w-4 h-4 text-gray-600" />
                    </span>
                    <span className="animate-bounce-dot animation-delay-200">
                      <CircleDot className="w-4 h-4 text-gray-600" />
                    </span>
                    <span className="animate-bounce-dot animation-delay-400">
                      <CircleDot className="w-4 h-4 text-gray-600" />
                    </span>
                  </div>
                </div>
              ) : (
                <MapComponent vehicles={locationList} />
              )}
            </div>

            {/* List */}
            {isPending ? (
              <div className="min-w-full items-center justify-center">
                <Loader className="animate-spin mx-auto" color="white" />
              </div>
            ) : (
              <InfiniteScroll
                className="bg-[#001621] border border-[#012d45] rounded-2xl"
                onEndScroll={() =>
                  hasNextPage && !isFetching && fetchNextPage()
                }
              >
                <VehicleList list={vehicleDataList} />
                {isFetchingNextPage && (
                  <Loader2 className="animate-spin mx-auto" color="white" />
                )}
              </InfiniteScroll>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default TrackingPage;
