import React, { useEffect, useState } from "react";
import axios from "axios";

const HistorialPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:8080/api/pedidos/mesero/historial", {
          headers: { Authorization: `Bearer ${token}` }

        });
        const entregados = res.data.filter(p => p.estado === "ENTREGADO");
        setPedidos(entregados);
      } catch (error) {
        console.error("Error al cargar historial", error);
      }
    };
    fetchPedidos();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Historial de pedidos</h2>
      {pedidos.length > 0 ? (
        <table className="w-full text-center">
          <thead className="bg-gray-100">
            <tr className="font-bold">
              <th className="p-2"># Pedido</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Cliente</th>
              <th className="p-2">Detalles</th>
              <th className="p-2">Total ($)</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((p) => (
              <tr key={p.id} className="border-t border-b">
                <td className="p-2">#{p.id}</td>
                <td className="p-2">{new Date(p.fecha).toLocaleString()}</td>
                <td className="p-2">{p.cliente}</td>
                <td className="p-2">
                  <ul>
                    {p.detalles.map((d, i) => (
                      <li key={i}>• {d.nombrePlatillo} x {d.cantidad} @ ${d.precio}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-2">$
                  {p.detalles.reduce((acc, item) => acc + item.cantidad * item.precio, 0).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No hay pedidos entregados aún.</p>
      )}
    </div>
  );
};

export default HistorialPedidos;
