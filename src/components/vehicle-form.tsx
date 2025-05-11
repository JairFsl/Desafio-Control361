import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  vehicleFormSchema,
  type VehicleFormData,
} from "@/services/schemas/vehicle-form-schema";

interface VehicleFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function VehicleForm({ open, setOpen }: VehicleFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      status: "ATIVO",
    },
  });

  const onSubmit = (data: VehicleFormData) => {
    console.log("Dados enviados:", data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="space-y-2 bg-[#000e17] text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Adicionar Veículo</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex flex-col gap-1">
            <Label htmlFor="plate">Placa *</Label>
            <Input id="plate" {...register("plate")} />
            {errors.plate && (
              <p className="text-red-500 text-sm">{errors.plate.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="model">Modelo *</Label>
            <Input id="model" {...register("model")} />
            {errors.model && (
              <p className="text-red-500 text-sm">{errors.model.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="type">Tipo *</Label>
            <Input id="type" {...register("type")} />
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="fleet">Frota</Label>
            <Input id="fleet" {...register("fleet")} />
            {errors.fleet && (
              <p className="text-red-500 text-sm">{errors.fleet.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="owner">Nome do Proprietário *</Label>
            <Input id="owner" {...register("owner")} />
            {errors.owner && (
              <p className="text-red-500 text-sm">{errors.owner.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label>Status</Label>
            <Select
              defaultValue="ATIVO"
              onValueChange={(value) =>
                setValue("status", value as "ATIVO" | "DESATIVADO")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ATIVO">ATIVO</SelectItem>
                <SelectItem value="DESATIVADO">DESATIVADO</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              className="text-black"
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 text-white">
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
