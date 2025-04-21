import React from "react";
import MenuCards from "./MenuCards";

const MenuSection = ({ category }) => {
  const { name, items } = category;

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-red-800 mb-4">{name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <MenuCards key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
