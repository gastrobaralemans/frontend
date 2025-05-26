import React, { useState } from "react";
import {useCarrito} from "../context/CarritoContext"
import { toast } from "sonner";


const ModalPlatillo = ({ item, onClose }) => {
  if (!item) return null;

  const { name, description, imageUrl, price, promoPrice } = item;
  const [cantidad, setCantidad] = useState(1);
  const { agregarAlCarrito } = useCarrito();

  const handleAgregar = () => {
  console.log("Agregando:", item.name, cantidad);
  agregarAlCarrito({ ...item, cantidad });
  toast.success(`"${item.name}" añadido al carrito (${cantidad}) items`);
  onClose();
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 w-[90%] max-w-md shadow-xl rounded-lg">
        <h2 className="text-2xl font-bold text-[#7A0000] mb-2">{name}</h2>
        <img src={imageUrl} alt={name} className="w-full h-48 object-cover mb-4 rounded" />
        <p className="mb-2 text-gray-700">{description}</p>
        <p className="text-xl font-semibold mb-2">
          {promoPrice ? (
            <>
              <span className="line-through text-[#740000] mr-2">${price.toFixed(2)}</span>
              <span className="text-black">${promoPrice.toFixed(2)}</span>
            </>
          ) : (
            <span>${price.toFixed(2)}</span>
          )}
        </p>

        <div className="flex items-center gap-3 mb-4">
          <label className="text-sm">Cantidad:</label>
          <input
            type="number"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            className="border rounded px-2 py-1 w-16"
          />
        </div>

        <button
          onClick={handleAgregar}
          className="w-full bg-black text-white py-2"
        >
          Añadir al carrito
        </button>

        <button
          onClick={onClose}
          className="w-full bg-black text-white py-2"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalPlatillo;
