import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner"


const AsociarIngredientes = () => {
  const [platillos, setPlatillos] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [recetas, setRecetas] = useState([]);
  const [formulario, setFormulario] = useState({
    platilloId: "",
    ingredienteId: "",
    cantidadRequerida: "",
  });

  const token = localStorage.getItem("token");

  const fetchPlatillos = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/menu/platillos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Platillos recibidos:", res.data);
      setPlatillos(res.data);
    } catch (error) {
      console.error("Error cargando platillos", error);
      if (error.response?.status === 401) {
        toast.error("Sesión expirada.");
      } else {
        toast.error("No se pudieron cargar los platillos.");
      }
    }
  };

  const fetchIngredientes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/ingredientes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIngredientes(res.data);
      console.log("Ingredientes recibidos:", res.data);
    } catch (error) {
      console.error("Error cargando ingredientes", error);
      if (error.response?.status === 401) {
        toast.error("Sesión expirada.");
      } else {
        toast.error("No se pudieron cargar los ingredientes");
      }
    }
  };

  const fetchReceta = async (platilloId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/recetas/${platilloId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(res.data)) {
        setRecetas(res.data);
        console.log("Recetas cargadas:", res.data);
      } else {
        console.error("Respuesta inesperada:", res.data);
        toast.error("Error al procesar la receta.");
        setRecetas([]);
      }

    } catch (error) {
      console.error("Error cargando receta", error);
      setRecetas([]);
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("sesión expirada")
        } else {
          toast.error("error al cargar recetas")
        }
      } else {
        toast.error("sin respuesta del servidor")
      }
    }
  };

  const handleSubmit = async () => {
    const yaAsociado = recetas.some(
      (r) => r.ingrediente.id === parseInt(formulario.ingredienteId)
    );

    if (yaAsociado) {
      toast.error("Este ingrediente ya está asociado a este platillo.");
      return;
    }
    console.log("Enviando receta:", formulario);
    try {
      await axios.post(
        "http://localhost:8080/api/recetas",
        {
          platillo: { id: formulario.platilloId },
          ingrediente: { id: formulario.ingredienteId },
          cantidadRequerida: parseInt(formulario.cantidadRequerida),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchReceta(formulario.platilloId);
      setFormulario({ ...formulario, ingredienteId: "", cantidadRequerida: "" });
      toast.success("Ingrediente asociado");
    } catch (error) {
      console.error("Error asociando ingrediente", error);
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("sesión expirada")
        } else {
          toast.error("no se pudo asociar el ingrediente")
        }
      } else {
        toast.error("sin respuesta del servidor")
      }
    }
  };

  useEffect(() => {
    fetchPlatillos();
    fetchIngredientes();
  }, []);

  useEffect(() => {
    const platilloGuardado = localStorage.getItem("platilloId");

    fetchPlatillos();
    fetchIngredientes();

    if (platilloGuardado) {
      setFormulario((f) => ({ ...f, platilloId: platilloGuardado }));
    }
  }, []);

  useEffect(() => {
    if (formulario.platilloId) {
      fetchReceta(formulario.platilloId);
    }
  }, [formulario.platilloId]);


  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Asociar Ingredientes a Platillo</h2>

      <div className="flex flex-col gap-4 mb-6">
        <select
          className="border p-2"
          value={formulario.platilloId}
          onChange={(e) => {
            const id = e.target.value;
            localStorage.setItem("platilloId", id);
            setFormulario({ ...formulario, platilloId: id });
          }}
        >
          <option value="">-- Selecciona un platillo --</option>
          {platillos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2"
          value={formulario.ingredienteId}
          onChange={(e) =>
            setFormulario({ ...formulario, ingredienteId: e.target.value })
          }
        >
          <option value="">-- Ingrediente --</option>
          {[...new Map(ingredientes.map(i => [i.nombre, i])).values()].map((i) => (
            <option key={i.id} value={i.id}>
              {i.nombre}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Cantidad requerida"
          className="border p-2"
          value={formulario.cantidadRequerida}
          onChange={(e) =>
            setFormulario({ ...formulario, cantidadRequerida: e.target.value })
          }
        />

        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2"
        >
          Asociar Ingrediente
        </button>
      </div>

      {recetas.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Ingredientes del platillo</h3>
          <table className="w-full text-center border">
            <thead className="bg-gray-100">
              <tr className="font-bold">
                <th className="p-2 border">Ingrediente</th>
                <th className="p-2 border">Cantidad requerida</th>
                <th className="p-2 border">Stock actual</th>
                <th className="p-2 border">Estado</th>
              </tr>
            </thead>
            <tbody>
              {recetas.map((r) => {
                const disponible = r.ingrediente.cantidadDisponible;
                const estado = disponible < r.cantidadRequerida ? "Insuficiente" : "Ok";
                return (
                  <tr key={r.id} className="border-t border-b">
                    <td className="p-2 border">{r.ingrediente.nombre}</td>
                    <td className="p-2 border">{r.cantidadRequerida}</td>
                    <td className="p-2 border">{disponible}</td>
                    <td className={`p-2 font-bold ${estado === "Insuficiente" ? "text-[#740000]" : "text-green-600"}`}>
                      {estado}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AsociarIngredientes;
