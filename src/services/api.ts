import type { FetchVechileDataResponse } from "@/types/tracking";

interface FetchVechileDataProps {
  //   filter?: string; // AVISO DO FIGMA: Removido para evitar erro
  type: string;
  pageParam: number;
  perPage?: number;
}

export async function FetchVechileData({
  type,
  pageParam,
  perPage = 20, // Padrão de 20 páginas de acordo com as informações do desafio
}: FetchVechileDataProps): Promise<FetchVechileDataResponse> {
  try {
    const res = await fetch(
      `https://develop-back-rota.rota361.com.br/recruitment/vehicles/list-with-paginate?type=${type}&page=${pageParam}&perPage=${perPage}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error ao consultar dados dos veículos", error);
    return {
      statusCode: 500,
      message: "Erro ao Consultar os dados dos veículos",
      content: {
        locationVehicles: [],
        page: pageParam,
        perPage: perPage.toString(),
        totalPages: 0,
        vehicles: [],
      },
    };
  }
}
