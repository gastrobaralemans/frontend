import React, { useEffect, useState, useMemo } from "react";
import { authFetch } from "../../utils/authFetch";
import MenuSection from "../../components/index/MenuSection";
import Nav from "../../layouts/nav";
import Footer from "../../components/footer";
import { toast } from "sonner";

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const categories = useMemo(() => {
    return menu.map(cat => cat.name).filter(Boolean);
  }, [menu]);

  const filteredMenu = useMemo(() => {
    return menu
      .map(category => ({
        ...category,
        items: category.items
          ?.filter(item => 
            (selectedCategory === "" || category.name === selectedCategory) &&
            (searchTerm === "" || 
             item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
             item.description?.toLowerCase().includes(searchTerm.toLowerCase()))
          )
          ?.sort((a, b) => a.name?.localeCompare(b.name))
      }))
      .filter(category => category.items?.length > 0);
  }, [menu, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <main className="flex-grow px-4 md:px-10 py-6 max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#740000] mb-6">
          ¿Qué te apetece comer hoy?
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-[#740000]"
            />
          </div>
          
          <div className="flex-1">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-[#740000] bg-white"
            >
              <option value="">Todas las categorías</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("");
            }}
            className="px-6 py-3 bg-black text-white"
          >
            Limpiar
          </button>
        </div>

        {filteredMenu.length === 0 && menu.length > 0 && (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600">No se encontraron resultados para tu búsqueda.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
              }}
              className="mt-2 text-[#740000] hover:underline"
            >
              Ver todos los items
            </button>
          </div>
        )}

        {filteredMenu.length > 0 ? (
          filteredMenu.map((category, idx) => (
            <MenuSection key={idx} category={category} />
          ))
        ) : menu.length === 0 ? (
          <p className="text-center text-gray-600">No hay elementos en el menú</p>
        ) : null}
      </main>

      <Footer />
    </div>
  );
};

export default MenuPage;