import React, { useState } from "react";
import { useCarrito } from "../../components/context/CarritoContext";
import { toast } from "sonner";

const PagoForm = () => {
  const { total, items, vaciar } = useCarrito();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    nombre: "",
    numero: "",
    expiracion: "",
    cvv: "",
  });

  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "numero" || name === "cvv") && /\D/.test(value)) return;
    if (name === "numero" && value.length > 16) return;
    if (name === "cvv" && value.length > 3) return;

    setForm({ ...form, [name]: value });
  };

  const validarExpiracion = (exp) => {
    const expRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expRegex.test(exp)) return false;

    const [mes, year] = exp.split("/").map(Number);
    const actual = new Date();
    const yearActual = Number(actual.getFullYear().toString().slice(-2));
    const mesActual = actual.getMonth() + 1;

    return year > yearActual || (year === yearActual && mes >= mesActual);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(form).some((f) => !f)) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    if (form.numero.length !== 16 || form.cvv.length !== 3) {
      toast.error("Número de tarjeta o CVV inválido");
      return;
    }
    if (!validarExpiracion(form.expiracion)) {
      toast.error("Fecha de expiración inválida o vencida");
      return;
    }

    const tarjetasGuardadas = JSON.parse(localStorage.getItem("tarjetas_usadas") || "[]");
    const cvvsGuardados = JSON.parse(localStorage.getItem("cvvs_usados") || "[]");

    if (tarjetasGuardadas.includes(form.numero)) {
      toast.error("Esta tarjeta ya fue registrada anteriormente");
      return;
    }

    if (cvvsGuardados.includes(form.cvv)) {
      toast.error("Este CVV ya fue utilizado en una transacción anterior");
      return;
    }

    localStorage.setItem("tarjetas_usadas", JSON.stringify([...tarjetasGuardadas, form.numero]));
    localStorage.setItem("cvvs_usados", JSON.stringify([...cvvsGuardados, form.cvv]));

    setMostrarModal(true);
  };

  const handleConfirmarPago = async () => {
    setLoading(true);
    try {
      const body = {
        platillos: items.map((i) => ({ id: i.id, cantidad: i.cantidad })),
        total,
        metodoPago: "Tarjeta",
      };

      const res = await fetch("http://localhost:8080/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Error al registrar el pedido");

      toast.success("Pago completado y pedido enviado con éxito");
      vaciar();
      setMostrarModal(false);
      setForm({ nombre: "", numero: "", expiracion: "", cvv: "" });
    } catch (err) {
      toast.error("No se pudo completar el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4 relative"
      >
        <h2 className="text-2xl font-bold text-[#740000] text-center">
          Datos de Tarjeta
        </h2>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre en la tarjeta"
          className="border p-2 w-full"
          onChange={handleChange}
          value={form.nombre}
        />
        <input
          type="text"
          name="numero"
          placeholder="Número de tarjeta (16 dígitos)"
          maxLength="16"
          className="border p-2 w-full"
          onChange={handleChange}
          value={form.numero}
        />
        <div className="flex gap-2">
          <input
            type="text"
            name="expiracion"
            placeholder="MM/AA"
            className="border p-2 w-1/2"
            onChange={handleChange}
            value={form.expiracion}
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            maxLength="3"
            className="border p-2 w-1/2"
            onChange={handleChange}
            value={form.cvv}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#740000] text-white py-2 rounded"
        >
          Validar tarjeta
        </button>
      </form>
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative">
            <h2 className="text-xl font-bold text-[#740000] mb-4">
              Confirmar Transacción
            </h2>
            <p><b>Nombre:</b> {form.nombre}</p>
            <p><b>Número:</b> **** **** **** {form.numero.slice(-4)}</p>
            <p><b>Expiración:</b> {form.expiracion}</p>
            <p><b>Total:</b> ${total.toFixed(2)}</p>
            <p><b>Método:</b> Tarjeta de crédito</p>

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={handleConfirmarPago}
                disabled={loading}
                className="bg-[#740000] text-white py-2 px-4 rounded hover:bg-[#580000]"
              >
                {loading ? "Procesando..." : "Confirmar Pago"}
              </button>
              <button
                onClick={() => setMostrarModal(false)}
                className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PagoForm;
