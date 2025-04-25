import { useEffect, useState } from "react";
import axios from "axios";

const ReservasAdmin = () => {
  const [todas, setTodas] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState("todos");

  useEffect(() => {
    obtenerReservas();
  }, []);

  const obtenerReservas = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Sesión expirada o no autenticado.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8080/api/reservas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTodas(response.data);
    } catch (error) {
      console.error("error en obtener las reservas", error);
    }
  };

  const ActualizarEstado = async (id, accion) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("expiro sesion o no autenticado.");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/reservas/${id}/${accion}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      obtenerReservas();
    } catch (error) {
      console.error(`Error al ${accion} reserva:`, error);
    }
  };

  const filtradas = todas.filter((r) => tipoFiltro === "todos" || r.tipoEvento === tipoFiltro);
  const pendientes = filtradas.filter((r) => r.estado === "pendiente");
  const aceptadas = filtradas.filter((r) => r.estado === "aceptado");
  const rechazadas = filtradas.filter((r) => r.estado === "rechazado");

  const TablaReservas = ({ titulo, reservas, mostrarAcciones }) => (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-2">{titulo}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Fecha para:</th>
              <th className="px-4 py-2">Hora</th>
              <th className="px-4 py-2">Cantidad</th>
              <th className="px-4 py-2">Decoración</th>
              <th className="px-4 py-2">Evento</th>
              {mostrarAcciones && <th className="px-4 py-2">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => {
              const fechaHora = new Date(reserva.fecha);
              const fecha = fechaHora.toLocaleDateString();
              const hora = fechaHora.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

              return (
                <tr key={reserva.id} className="text-center border-b">
                  <td className="px-4 py-2">{reserva.id}</td>
                  <td className="px-4 py-2">{reserva.nombre}</td>
                  <td className="px-4 py-2">{fecha}</td>
                  <td className="px-4 py-2">{hora}</td>
                  <td className="px-4 py-2">{reserva.cantidad}</td>
                  <td className="px-4 py-2">{reserva.decoracion}</td>
                  <td className="px-4 py-2 capitalize">{reserva.tipoEvento}</td>
                  {mostrarAcciones && (
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => ActualizarEstado(reserva.id, "aceptar")}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Aceptar
                      </button>
                      <button
                        onClick={() => ActualizarEstado(reserva.id, "rechazar")}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Rechazar
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
            {reservas.length === 0 && (
              <tr>
                <td colSpan={mostrarAcciones ? 8 : 7} className="text-center py-4">
                  No hay reservas en esta categoría.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Lista de reservas</h2>

      {/* Filtro por tipo */}
      <div className="mb-6">
        <label className="font-semibold mr-3">Filtrar por tipo de evento:</label>
        <select
          value={tipoFiltro}
          onChange={(e) => setTipoFiltro(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="todos">Todos</option>
          <option value="cumpleaños">Cumpleaños</option>
          <option value="boda">Boda</option>
          <option value="graduacion">Graduación</option>
        </select>
      </div>

      <TablaReservas titulo="Pendientes" reservas={pendientes} mostrarAcciones={true} />
      <TablaReservas titulo="Aceptadas" reservas={aceptadas} mostrarAcciones={false} />
      <TablaReservas titulo="Rechazadas" reservas={rechazadas} mostrarAcciones={false} />
    </div>
  );
};

export default ReservasAdmin;
