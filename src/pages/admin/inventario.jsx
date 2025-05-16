import React, { useEffect, useState } from "react";
import axios from "axios";

const InventarioAdmin = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: "", cantidadDisponible: "" });

  const token = localStorage.getItem("token");

  const fetchIngredientes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/ingredientes", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIngredientes(response.data);
    } catch (error) {
      console.error("Error al cargar ingredientes", error);
    }
  };

  const agregarIngrediente = async () => {
    try {
      await axios.post("http://localhost:8080/api/ingredientes", nuevo, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNuevo({ nombre: "", cantidadDisponible: "" });
      fetchIngredientes();
    } catch (error) {
      console.error("Error al agregar", error);
    }
  };

  const actualizarIngrediente = async (id, cantidad) => {
    try {
      const ingrediente = ingredientes.find((i) => i.id === id);
      await axios.put(
        `http://localhost:8080/api/ingredientes/${id}`,
        { ...ingrediente, cantidadDisponible: cantidad },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchIngredientes();
    } catch (error) {
      console.error("Error al actualizar", error);
    }
  };

  const eliminarIngrediente = async (id) => {
    if (!confirm("¿Seguro que querés eliminar este ingrediente?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/ingredientes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchIngredientes();
    } catch (error) {
      console.error("Error al eliminar", error);
    }
  };

  useEffect(() => {
    fetchIngredientes();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Inventario</h2>

      {/* Agregar ingrediente */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Nombre"
          className="border px-2 py-1"
          value={nuevo.nombre}
          onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Cantidad"
          className="border px-2 py-1"
          value={nuevo.cantidadDisponible}
          onChange={(e) => setNuevo({ ...nuevo, cantidadDisponible: e.target.value })}
        />
        <button
          onClick={agregarIngrediente}
          className="bg-black text-white px-3 py-1"
        >
          Agregar
        </button>
      </div>

      <table className="w-full text-center border">
        <thead className="bg-gray-100">
          <tr className="font-bold">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Cantidad</th>
            <th className="p-2 border">Actualizar</th>
            <th className="p-2 border">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {ingredientes.map((ing) => (
            <tr key={ing.id} className="border-t border-b">
              <td className="p-2 border">{ing.id}</td>
              <td className="p-2 border">{ing.nombre}</td>
              <td className="p-2 border">
                {ing.cantidadDisponible}
                <span className={`ml-2 font-bold ${ing.cantidadDisponible <= (ing.stockMinimo || 5) ? 'text-[#740000]' : 'text-green-600'}`}>
                  {ing.cantidadDisponible <= (ing.stockMinimo || 5) ? 'Bajo Stock' : 'Ok'}
                </span>
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => actualizarIngrediente(ing.id, ing.cantidadDisponible)}
                  className="bg-black text-white px-3 py-1"
                >
                  Guardar
                </button>
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => eliminarIngrediente(ing.id)}
                  className="bg-black text-white px-3 py-1"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventarioAdmin;
