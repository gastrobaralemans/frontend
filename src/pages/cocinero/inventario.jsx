import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner"

const InventarioCocinero = () => {
  const [ingredientes, setIngredientes] = useState([]);

  const fetchIngredientes = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:8080/api/ingredientes", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIngredientes(response.data);
    } catch (error) {
      console.error("Error al cargar inventario", error);
      toast.error("No se pudo cargar el inventario.");
    }
  };

  useEffect(() => {
    fetchIngredientes();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Inventario de Ingredientes</h2>
      <table className="w-full text-center border">
        <thead className="bg-gray-100">
          <tr className="font-bold">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Cantidad Disponible</th>
          </tr>
        </thead>
        <tbody>
          {ingredientes.map((ing) => (
            <tr key={ing.id} className="border-t border-b">
              <td className="p-2 border">{ing.id}</td>
              <td className="p-2 border">{ing.nombre}</td>
              <td className="p-2 border">{ing.cantidadDisponible}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventarioCocinero;
