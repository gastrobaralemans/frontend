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

  const marcarComoEntregado = async (pedidoId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:8080/api/pedidos/${pedidoId}/entregado`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const actualizado = pedidos.map((p) =>
        p.id === pedidoId ? { ...p, estado: "Entregado" } : p
      );
      setPedidos(actualizado);
    } catch (error) {
      console.error("Error al marcar como entregado", error);
      alert("No se pudo marcar como entregado.");
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const pedidosPendientes = pedidos.filter(p => p.estado !== "ENTREGADO");
  const pedidosEntregados = pedidos.filter(p => p.estado === "ENTREGADO");

  const renderTabla = (lista, mostrarBoton) => (
    <table className="w-full text-center mb-8">
      <thead className="bg-gray-100">
        <tr className="font-bold">
          <th className="p-2"># Pedido</th>
          <th className="p-2">Fecha del pedido</th>
          <th className="p-2">Estado</th>
          <th className="p-2">Cliente</th>
          <th className="p-2">Lista de platillos</th>
          <th className="p-2">Total ($)</th>
          {mostrarBoton && <th className="p-2">Marcar como:</th>}
        </tr>
      </thead>
      <tbody>
        {lista.map((p) => {
          console.log(p.detalles)
          const total = p.detalles.reduce(
            (acc, item) => acc + item.cantidad * item.precio,
            0
          );

          return (
            <tr key={p.id} className="border-t border-b">
              <td className="p-2">#{p.id}</td>
              <td className="p-2">{new Date(p.fecha).toLocaleString()}</td>
              <td
                className={`p-2 ${
                  p.estado === "Entregado" ? "text-[#740000] font-semibold" : ""
                }`}
              >
                {p.estado}
              </td>
              <td className="p-2">{p.cliente}</td>
              <td className="p-2">
                <ul>
                  {p.detalles.map((d, index) => (
                    <li key={index}>
                      • {d.nombrePlatillo} x {d.cantidad} @ ${d.precio}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="p-2 font-medium">${total.toFixed(2)}</td>
              {mostrarBoton && (
                <td className="p-2">
                  <button
                    onClick={() => marcarComoEntregado(p.id)}
                    className="bg-black text-white px-3 py-1"
                  >
                    Entregado
                  </button>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Pedidos Pendientes</h2>
      {pedidosPendientes.length > 0 ? (
        renderTabla(pedidosPendientes, true)
      ) : (
        <p className="mb-8 text-gray-500">No hay pedidos pendientes.</p>
      )}

      <h2 className="text-2xl font-semibold mb-4 mt-10">Pedidos Entregados</h2>
      {pedidosEntregados.length > 0 ? (
        renderTabla(pedidosEntregados, false)
      ) : (
        <p className="text-gray-500">No hay pedidos entregados aún.</p>
      )}
    </div>
  );
};

export default PedidosAdmin;
