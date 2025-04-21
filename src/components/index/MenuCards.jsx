import React from 'react';
import Button from '../auth/button';

const MenuCards = ({item}) =>{
    const { name, description, imageUrl, price, promoPrice } = item;
    console.log("imageUrl:", imageUrl);
  return (
    <div className=" p-4 w-full h-full">
      <img src={imageUrl} alt={item.name} className="w-full h-48 object-cover rounded-xs mb-3" />
      
      <h3 className="text-lg font-semibold mb-1 text-center text-[#7A0000]">{name}</h3>
      {description && <p className="text-sm text-gray-600 text-center mb-3">{description}</p>}
      <div className="text-3xl text-center font-bold mb-3">
        
        {promoPrice ? (
          <>
            <span className="line-through text-red-400 mr-2">${price.toFixed(2)}</span>
            <span className="text-green-600">${promoPrice.toFixed(2)}</span>
          </>
        ) : (
          <span>${price.toFixed(2)}</span>
        )}
        
      </div>
      <Button>Ordenar platillo</Button>
    </div>
  );

}

export default MenuCards