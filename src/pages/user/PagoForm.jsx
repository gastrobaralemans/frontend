import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useCarrito } from '../../components/context/CarritoContext'
import { toast } from 'sonner'
const PagoForm = () => {
  const navigate = useNavigate();
  const { total } = useCarrito();
  const [form, setForm] = useState({
    nombre: "",
    numero: "",
    expiracion: "",
    cvv: "",
  });

   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(form).some((f) => !f)) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    if (form.numero.length !== 16 || form.cvv.length !== 3) {
      toast.error("Datos de tarjeta inválidos");
      return;
    }

    navigate("/pago/confirmacion", { state: { ...form, total } });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-[#740000] text-center">Datos de Tarjeta</h2>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre en la tarjeta"
          className="border p-2 w-full"
          onChange={handleChange}
        />
        <input
          type="text"
          name="numero"
          placeholder="Número de tarjeta (16 dígitos)"
          maxLength="16"
          className="border p-2 w-full"
          onChange={handleChange}
        />
        <div className="flex gap-2">
          <input
            type="text"
            name="expiracion"
            placeholder="MM/AA"
            className="border p-2 w-1/2"
            onChange={handleChange}
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            maxLength="3"
            className="border p-2 w-1/2"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Validar y Continuar
        </button>
      </form>
    </div>
  );
};

export default PagoForm;