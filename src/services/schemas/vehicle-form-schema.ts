import { z } from "zod";

export const vehicleFormSchema = z.object({
  plate: z.string().min(7, "Placa inválida"),
  model: z.string().min(1, "Modelo é obrigatório"),
  type: z.string().min(1, "Tipo é obrigatório"),
  fleet: z.string().optional(),
  owner: z.string().min(1, "Nome do proprietário é obrigatório"),
  status: z.enum(["ATIVO", "DESATIVADO"]).default("ATIVO").optional(),
});

export type VehicleFormData = z.infer<typeof vehicleFormSchema>;
