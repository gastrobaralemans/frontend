import React, { useState } from 'react';
import Button from '../auth/button';
import ModalPlatillo from './modalplatillo';

const MenuCards = ({ item }) => {
  const { name, description, imageUrl, price, promoPrice } = item;
  const [showModal, setShowModal] = useState(false);
  console.log("imageUrl:", imageUrl);
  return (
    <div className="p-4 w-full h-full">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover rounded-xs mb-3" />
      <h3 className="text-lg font-semibold mb-1 text-center text-[#7A0000]">{name}</h3>
      {description && <p className="text-sm text-gray-600 text-center mb-3">{description}</p>}
      <div className="text-3xl text-center font-bold mb-3">
        {promoPrice ? (
          <>
            <span className="line-through text-[#740000] mr-2">${price.toFixed(2)}</span>
            <span className="text-black">${promoPrice.toFixed(2)}</span>
          </>
        ) : (
          <span>${price.toFixed(2)}</span>
        )}
      </div>
      <Button onClick={() => setShowModal(true)}>Ordenar</Button>
      {showModal && <ModalPlatillo item={item} onClose={() => setShowModal(false)} />}
    </div>
  );

}

export default MenuCards