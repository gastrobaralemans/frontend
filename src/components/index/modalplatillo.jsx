import React from "react";

const ModalPlatillo = ({item, onClose}) =>{
    if (!item) return null;

    const { name, description, imageUrl, price, promoPrice } = item;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 w-[90%] max-w-md shadow-xl">
        <h2 className="text-2xl font-bold text-[#7A0000] mb-2">{name}</h2>
        <img src={imageUrl} alt={name} className="w-full h-48 object-cover mb-4 rounded" />
        <p className="mb-2 text-gray-700">{description}</p>
        <p className="text-xl font-semibold">
          {promoPrice ? (
            <>
              <span className="line-through text-red-500 mr-2">${price.toFixed(2)}</span>
              <span className="text-green-600">${promoPrice.toFixed(2)}</span>
            </>
          ) : (
            <span>${price.toFixed(2)}</span>
          )}
        </p>
        <p className="mt-4">Método de pago: <strong>Efectivo</strong></p>
        <button onClick={onClose} className="mt-4 w-full bg-black text-white py-2">Cerrar</button>
      </div>
    </div>
  );
}
export default ModalPlatillo