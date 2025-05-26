import React, { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "sonner"

const PedidosMesero = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/menu/platillos", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMenuItems(res.data);
      } catch (error) {
        console.error("Error cargando platillos", error);
      }
    };
    fetchMenu();
  }, []);

  const agregarPlatillo = (id) => {
    const yaEsta = seleccionados.find((p) => p.id === id);
    if (yaEsta) {
      setSeleccionados(
        seleccionados.map((p) =>
          p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      );
    } else {
      const platillo = menuItems.find((m) => m.id === parseInt(id));
      setSeleccionados([...seleccionados, { ...platillo, cantidad: 1 }]);
    }
  };

  const enviarPedido = async () => {
  try {
    const body = {
      platillos: seleccionados.map((p) => ({ id: p.id, cantidad: p.cantidad }))
    };

    await axios.post("http://localhost:8080/api/pedidos/mesero", body, {
      headers: { Authorization: `Bearer ${token}` }
    });

    toast.success("Pedido registrado con éxito");
    setSeleccionados([]);
  } catch (error) {
    console.error("Error enviando pedido", error);
    toast.error("Error enviando pedido: " + (error.response?.data || "ver consola"));
  }
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Registrar pedidos</h2>
      <select
        className="border p-2 w-full mb-4"
        onChange={(e) => agregarPlatillo(e.target.value)}
      >
        <option value="">-- Selecciona un platillo --</option>
        {menuItems.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} - ${p.price}
          </option>
        ))}
      </select>

      {seleccionados.length > 0 && (
        <ul className="mb-4">
          {seleccionados.map((p) => (
            <li key={p.id}>
              {p.name} x {p.cantidad} = ${(p.price * p.cantidad).toFixed(2)}
            </li>
          ))}
        </ul>
      )}

      <button
        className="bg-black text-white px-4 py-2"
        onClick={enviarPedido}
      >
        Registrar Pedido
      </button>
    </div>
  );
};

export default PedidosMesero;