import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuSection from "../../components/index/MenuSection";

const MenuPage = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/menu')
      .then(res => setMenu(res.data))
      .catch(err => console.error('Error al cargar menú:', err));
  }, []);

  return (
    <div className="px-4 md:px-10 py-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-red-800 mb-10">
        ¿Qué te apetece comer hoy?
      </h1>

      {menu.length > 0 ? (
        menu.map((category, idx) => (
          <MenuSection key={idx} category={category} />
        ))
      ) : (
        <p>No hay elementos en el menú</p>
      )}
    </div>
  );
};

export default MenuPage;
