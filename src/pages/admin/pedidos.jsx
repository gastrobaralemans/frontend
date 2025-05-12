import React, { useEffect, useState } from "react";
import axios from "axios";

const PedidosAdmin = () => {
  const [pedidos, setPedidos] = useState([]);

  const fetchPedidos = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:8080/api/pedidos", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPedidos(response.data);
    } catch (error) {
      console.error("Error al cargar pedidos", error);
      alert("No se pudieron cargar los pedidos.");
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

    return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Pedidos</h2>
      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2"># Pedido</th>
            <th className="p-2">Fecha</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Cliente</th>
            <th className="p-2">Platillos</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">#{p.id}</td>
              <td className="p-2">{new Date(p.fecha).toLocaleString()}</td>
              <td className="p-2">{p.estado}</td>
              <td className="p-2">{p.cliente?.nombre || p.cliente?.correo}</td>
              <td className="p-2">
                <ul>
                  {p.detalles.map((d, index) => (
                    <li key={index}>• {d.nombrePlatillo} x {d.cantidad}</li>
                    ))}

                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default PedidosAdmin