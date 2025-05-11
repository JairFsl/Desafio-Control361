import { useInfiniteQuery } from "@tanstack/react-query";
import { FetchVechileData } from "../api";

interface UseVehicleProps {
  filter: string;
}

export default function useVehicle({ filter }: UseVehicleProps) {
  return useInfiniteQuery({
    queryKey: ["vehicleData", filter],
    queryFn: async ({ pageParam = 1 }) =>
      await FetchVechileData({
        type: filter,
        pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.content.page === lastPage.content.totalPages)
        return undefined;

      return lastPage.content.page + 1;
    },
    refetchInterval: 120000, // Reconsulta os dados a cada 2 minutos
  });
}
