import { useCarrito } from "../../components/context/CarritoContext";
import { useNavigate } from "react-router-dom";
import {toast} from "sonner"

const CarritoPage = () => {
  const { items, cambiarCantidad, quitarDelCarrito, total, vaciar } = useCarrito();
  const navigate = useNavigate();

  const enviarPedido = async () => {
    const token = localStorage.getItem("token");
    const body = {
      platillos: items.map((i) => ({ id: i.id, cantidad: i.cantidad })),
      total,
      metodoPago: "Efectivo"
    };

    const res = await fetch("http://localhost:8080/api/pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      toast.error("Error al enviar pedido");
      return;
    }

    toast.success("Pedido enviado con éxito");
    vaciar();
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Tu Carrito</h2>
      {items.length === 0 ? (
        <p className="text-center">No hay platillos en tu carrito.</p>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="border-b pb-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">
                ${(item.promoPrice || item.price).toFixed(2)} c/u
              </p>
              <div className="flex items-center gap-3 mt-2">
                <label>Cantidad:</label>
                <input
                  type="number"
                  min="1"
                  value={item.cantidad}
                  onChange={(e) => cambiarCantidad(item.id, +e.target.value)}
                  className="border px-2 py-1 w-16"
                />
                <button
                  onClick={() => {
                    quitarDelCarrito(item.id);
                    toast.info(`"${item.name}" fue removido del carrito`);
                  }}
                  className="text-[#740000] hover:underline"
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}
          <div className="text-right font-bold text-lg">
            Total: ${total.toFixed(2)}
          </div>
          <button
            onClick={enviarPedido}
            className="w-full bg-black text-white py-2"
          >
            Enviar Pedido
          </button>
        </div>
      )}
    </div>
  );
};

export default CarritoPage;
