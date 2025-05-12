import React from "react";
import {useCarrito} from "../context/CarritoContext";

const CarritoModal = ({ onClose }) => {
  const { items, cambiarCantidad, quitarDelCarrito, total, vaciar } = useCarrito();

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
      alert("Error al enviar pedido");
      return;
    }

    alert("Pedido enviado");
    vaciar();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96 max-h-[80vh] overflow-auto">
        <h2 className="text-xl font-bold mb-4">Carrito</h2>
        {items.length === 0 ? (
          <p>No hay elementos</p>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.id} className="mb-4 border-b pb-2">
                <h3>{item.name}</h3>
                <p>
                  Precio: ${(item.promoPrice || item.price).toFixed(2)} x{" "}
                  <input
                    type="number"
                    min="1"
                    value={item.cantidad}
                    onChange={(e) => cambiarCantidad(item.id, +e.target.value)}
                    className="w-12 border px-1"
                  />
                </p>
                <button onClick={() => quitarDelCarrito(item.id)} className="text-red-600">Quitar</button>
              </div>
            ))}
            <p className="font-bold">Total: ${total.toFixed(2)}</p>
            <button onClick={enviarPedido} className="w-full bg-green-600 text-white py-2 mt-4">Enviar Pedido</button>
          </>
        )}
        <button onClick={onClose} className="mt-4 w-full bg-black text-white py-2">Cerrar</button>
      </div>
    </div>
  );
};

export default CarritoModal;
