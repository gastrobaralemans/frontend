import { useEffect, useState } from "react";
import axios from "axios";
const UsersTable = () =>{
    const [personas, setPersonas] = useState([]);
    const [rolFiltro, setRolFiltro] = useState("todos");
    useEffect(() => {
        obtenerPersonas();
      }, []);

      const obtenerPersonas = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Sesión expirada o no autenticado.");
          return;
        }
        try {
            const response = await axios.get("http://localhost:8080/api/personas", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      
            setPersonas(response.data);
          } catch (error) {
            console.error("Error al obtener personas", error);
          }
        };
        const filtradas =
    rolFiltro === "todos"
      ? personas
      : personas.filter((p) => p.rol.toLowerCase() === rolFiltro.toLowerCase());
    return(
        <>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Vista de usuarios registrados </h2>
                <div className="mb-6">
                    <label className="font-semibold mr-3">Filtrar por rol:</label>
                    <select
                    value={rolFiltro}
                    onChange={(e) => setRolFiltro(e.target.value)}
                    className="border rounded px-3 py-1"
                    >
                    <option value="todos">Todos</option>
                    <option value="admin">Admin</option>
                    <option value="mesero">Mesero</option>
                    <option value="cocinero">Cocinero</option>
                    <option value="usuario">Usuario</option>
                    </select>
                </div>
                <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Correo</th>
              <th className="px-4 py-2">Rol</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.map((persona) => (
              <tr key={persona.id} className="text-center border-b">
                <td className="px-4 py-2">{persona.id}</td>
                <td className="px-4 py-2">{persona.nombre}</td>
                <td className="px-4 py-2">{persona.correo}</td>
                <td className="px-4 py-2 capitalize">{persona.rol}</td>
              </tr>
            ))}
            {filtradas.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No hay usuarios en esta categoría.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
            </div>
        </>
    );
}

export default UsersTable