import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner"

const PedidosCocinero = () => {
  const [pedidos, setPedidos] = useState([]);

  const fetchPedidos = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:8080/api/pedidos", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPedidos(response.data);
    } catch (error) {
      console.error("Error al cargar pedidos", error);
      toast.error("No se pudieron cargar los pedidos.");
    }
  };

  const marcarComoEnPreparacion = async (pedidoId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:8080/api/pedidos/${pedidoId}/preparando`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPedidos();
    } catch (error) {
      console.error("Error al marcar en preparación", error);
      toast.error("No se pudo actualizar el pedido.");
    }
  };

  const marcarComoListo = async (pedidoId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:8080/api/pedidos/${pedidoId}/listo`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPedidos();
    } catch (error) {
      console.error("Error al marcar como listo", error);
      toast.error("No se pudo actualizar el pedido.");
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const pedidosPendientes = pedidos.filter((p) => p.estado === "PENDIENTE");
  const pedidosEnPreparacion = pedidos.filter((p) => p.estado === "EN_PREPARACION");
  const pedidosListos = pedidos.filter((p) => p.estado === "LISTO");

  const renderTabla = (lista, tipo) => (
    <table className="w-full text-center mb-8">
      <thead className="bg-gray-100">
        <tr className="font-bold">
          <th className="p-2"># Pedido</th>
          <th className="p-2">Fecha</th>
          <th className="p-2">Estado</th>
          <th className="p-2">Cliente</th>
          <th className="p-2">Platillos</th>
          <th className="p-2">Total ($)</th>
          {tipo !== "listo" && <th className="p-2">Marcar como:</th>}
        </tr>
      </thead>
      <tbody>
        {lista.map((p) => {
          const total = p.detalles.reduce(
            (acc, item) => acc + item.cantidad * item.precio,
            0
          );

          return (
            <tr key={p.id} className="border-t border-b">
              <td className="p-2">#{p.id}</td>
              <td className="p-2">{new Date(p.fecha).toLocaleString()}</td>
              <td className="p-2">{p.estado}</td>
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
              {tipo !== "listo" && (
                <td className="p-2">
                  {tipo === "pendiente" && (
                    <button
                      onClick={() => marcarComoEnPreparacion(p.id)}
                      className="bg-black text-white px-3 py-1"
                    >
                      En preparación
                    </button>
                  )}
                  {tipo === "preparando" && (
                    <button
                      onClick={() => marcarComoListo(p.id)}
                      className="bg-black text-white px-3 py-1"
                    >
                      Listo
                    </button>
                  )}
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
        renderTabla(pedidosPendientes, "pendiente")
      ) : (
        <p className="mb-8 text-gray-500">No hay pedidos pendientes.</p>
      )}

      <h2 className="text-2xl font-semibold mb-4 mt-10">Pedidos en preparación</h2>
      {pedidosEnPreparacion.length > 0 ? (
        renderTabla(pedidosEnPreparacion, "preparando")
      ) : (
        <p className="text-gray-500">No hay pedidos en preparación.</p>
      )}

      <h2 className="text-2xl font-semibold mb-4 mt-10">Pedidos listos</h2>
      {pedidosListos.length > 0 ? (
        renderTabla(pedidosListos, "listo")
      ) : (
        <p className="text-gray-500">No hay pedidos listos por el momento.</p>
      )}
    </div>
  );
};

export default PedidosCocinero;
