export type VehicleData = {
  createdAt: Date;
  fleet: string | null;
  id: string;
  model: string;
  nameOwner: string;
  plate: string;
  status: string;
  type: string;
};

export type VehicleLocation = {
  createdAt: Date;
  equipmentId: string;
  fleet: string | null;
  id: string;
  ignition: string;
  lat: number;
  lng: number;
  name: string;
  plate: string;
};

export interface FetchVechileDataResponse {
  statusCode: number;
  message: string;
  content: {
    page: number;
    perPage: string;
    totalPages: number;
    vehicles: VehicleData[];
    locationVehicles?: VehicleLocation[];
  };
}
