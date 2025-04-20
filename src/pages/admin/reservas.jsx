import { useEffect, useState } from "react";
import axios from "axios";


const ReservasAdmin = () =>{
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        obtenerReservas();
    }, []);
    const obtenerReservas = async () => {
        try {
          const response = await axios.get("http://localhost:8080/api/reservas");
          setReservas(response.data.filter(reserva => reserva.estado === "pendiente"));
        } catch (error) {
          console.error("error en obtener las reservas" , error);
        }
    };

    const ActualizarEstado = async (id, accion) =>{
        try{
            await axios.put(`http://localhost:8080/api/reservas/${id}/${accion}`);
            obtenerReservas();
        } catch(error){
            console.error (`Error al ${accion} reserva:`, error);
        }
    }


    return (
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Solicitudes de reservas</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">Hora</th>
                  <th className="px-4 py-2">Cantidad de personas</th>
                  <th className="px-4 py-2">Decoración especial</th>
                  <th className="px-4 py-2">Celebración</th>
                  <th className="px-4 py-2">Acciones</th>
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
                      <td className="px-4 py-2">{reserva.cantidad} personas</td>
                      <td className="px-4 py-2">{reserva.decoracion}</td>
                      <td className="px-4 py-2">{reserva.tipoEvento}</td>
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
                    </tr>
                  );
                })}
                {reservas.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No hay reservas pendientes
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
}

export default ReservasAdmin