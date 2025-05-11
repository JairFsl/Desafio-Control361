import { Link } from "react-router-dom";
import { MapPinOff } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center p-6 text-center bg-[#001e2e]">
      <div className="mb-6">
        <MapPinOff size={72} color="blue" />
      </div>
      <h1 className="text-5xl font-bold text-white mb-4">404</h1>
      <p className="text-xl text-white mb-6">
        Rota não encontrada. O veículo saiu do radar...
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl shadow transition"
      >
        <p className="text-white font-bold">Voltar ao painel</p>
      </Link>
    </div>
  );
};

export default NotFound;
