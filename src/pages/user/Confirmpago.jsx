import { useLocation, useNavigate } from "react-router-dom";
import { useCarrito } from "../../components/context/CarritoContext";
import { toast } from "sonner";

const ConfirmarPago = () => {
  const { state } = useLocation();
  const { items, vaciar } = useCarrito();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleConfirmar = async () => {
    try {
      const body = {
        platillos: items.map((i) => ({ id: i.id, cantidad: i.cantidad })),
        total: state.total,
        metodoPago: "Tarjeta",
      };

      const res = await fetch("http://localhost:8080/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Error al registrar el pedido");

      toast.success("Pago completado y pedido enviado");
      vaciar();
      navigate("/");
    } catch {
      toast.error("No se pudo completar el pago");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center space-y-2">
        <h2 className="text-xl font-bold text-[#740000] mb-4">Datos de Transacción</h2>
        <p><b>Nombre:</b> {state.nombre}</p>
        <p><b>Número:</b> **** **** **** {state.numero.slice(-4)}</p>
        <p><b>Expiración:</b> {state.expiracion}</p>
        <p><b>Total:</b> ${state.total.toFixed(2)}</p>
        <p><b>Método:</b> Tarjeta de crédito</p>

        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={handleConfirmar}
            className="bg-[#740000] text-white py-2 px-4"
          >
            Confirmar Pago
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-black text-white py-2 px-4"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmarPago;
