import React, { useEffect, useState } from "react";
import { authFetch } from "../../utils/authFetch";
import MenuSection from "../../components/index/MenuSection";
import Nav from "../../layouts/nav";
import Footer from "../../components/footer";
import { toast } from "sonner"

const MenuPage = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    authFetch('http://localhost:8080/api/menu')
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Error ${res.status}: ${text}`);
        }
        return res.json();
      })
      .then(data => setMenu(data))
      .catch(err => {
        console.error('Error al cargar menú:', err);
        toast.error("Sesión expirada.");
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <main className="flex-grow px-4 md:px-10 py-6 max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#740000] mb-10">
          ¿Qué te apetece comer hoy?
        </h1>

        {menu.length > 0 ? (
          menu.map((category, idx) => (
            <MenuSection key={idx} category={category} />
          ))
        ) : (
          <p>No hay elementos en el menú</p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MenuPage;
