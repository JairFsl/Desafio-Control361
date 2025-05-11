import { formatPlaca } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import type { VehicleData } from "@/types/tracking";

interface VehicleListProps {
  list: VehicleData[] | undefined;
}

export default function VehicleList({ list }: VehicleListProps) {
  if (!list || list.length <= 0) {
    return (
      <div className="flex h-20 bg-[#001621] border border-[#012d45] rounded-2xl text-white items-center justify-center">
        Nenhum veículo encontrado!
      </div>
    );
  }

  return (
    <div className="">
      <Table className="min-w-full divide-y divide-[#012d45]">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-center text-white border border-l-0 border-t-0 border-[#012d45] h-[55px]">
              Placa
            </TableHead>
            <TableHead className="text-center text-white border border-t-0 border-[#012d45] h-[55px]">
              Frota
            </TableHead>
            <TableHead className="text-center text-white border border-t-0 border-[#012d45] h-[55px]">
              Tipo
            </TableHead>
            <TableHead className="text-center text-white border border-t-0 border-[#012d45] h-[55px]">
              Modelo
            </TableHead>
            <TableHead className="text-center text-white border border-r-0 border-t-0 border-[#012d45] h-[55px]">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-[#012d45]">
          {list.map((vehicle, index) => (
            <TableRow key={index.toString()} className="hover:bg-[#012d4572]">
              <TableCell className="text-[#C8C8C8] border border-l-0 border-b-0 border-[#012d45] px-4 py-4 text-center">
                {formatPlaca(vehicle.plate)}
              </TableCell>
              <TableCell className="text-[#C8C8C8] border border-b-0 border-[#012d45] px-4 py-4 items-center- justify-center text-center">
                {vehicle.fleet ?? "SEM FROTA"}
              </TableCell>
              <TableCell className="text-[#C8C8C8] border border-b-0 border-[#012d45] px-4 py-4 items-center- justify-center text-center">
                {vehicle.type}
              </TableCell>
              <TableCell className="text-[#C8C8C8] border border-b-0 border-[#012d45] px-4 py-4 items-center- justify-center text-center">
                {vehicle.model}
              </TableCell>
              <TableCell className="text-[#C8C8C8] border border-r-0 border-b-0 border-[#012d45] px-4 py-4 items-center- justify-center text-center">
                <span className="text-white text-center items-center justify-center flex">
                  {vehicle.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
