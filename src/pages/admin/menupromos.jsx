import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../components/auth/button";
import { Eye } from "lucide-react";
import { toast } from "sonner"

const MenuCardsAdmin = ({ item, abrirModal, abrirPromoInfo }) => {
  const { name, description, imageUrl, price, promoPrice } = item;

  return (
    <div className="p-4 w-full h-full relative">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover mb-3" />
      <h3 className="text-lg font-semibold mb-1 text-center text-[#7A0000]">{name}</h3>
      <p className="text-sm text-center">{description}</p>
      <div className="text-3xl text-center font-bold mb-3">
        {promoPrice ? (
          <>
            <span className="line-through text-[#740000] mr-2">${price.toFixed(2)}</span>
            <span className="text-black">${promoPrice.toFixed(2)}</span>
            <button onClick={() => abrirPromoInfo(item)} className="absolute top-2 right-2">
              <Eye className="text-[#740000] w-10 h-10" />
            </button>
          </>
        ) : (
          <span>${price.toFixed(2)}</span>
        )}
      </div>
      <Button onClick={() => abrirModal(item)}>Crear promo</Button>
    </div>
  );
};

const PromoModal = ({ item, onClose, fetchMenu }) => {
  const [promoPrice, setPromoPrice] = useState(item.promoPrice || "");
  const [startDate, setStartDate] = useState(
    item.startDate ? item.startDate + "T00:00" : ""
  );
  const [endDate, setEndDate] = useState(
    item.endDate ? item.endDate + "T00:00" : ""
  );
  const [promoDescription, setPromoDescription] = useState(item.promoDescription || "");
  const Validate = () => {
    if (!promoPrice || isNaN(promoPrice) || Number(promoPrice) <= 0) {
      toast.error("El precio tiene que ser positivo");
      return false;
    }
    if (Number(promoPrice) >= item.price) {
      toast.error(`El precio de promo no puede ser mayor o igual a $${item.price}`);
      return false;
    }
    if (!startDate || !endDate) {
      toast.error("Las fechas son obligatorias");
      return false;
    }
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start < now) {
      toast.error("La fecha de inicio no puede ser anterior a ahora");
      return false;
    }
    if (end < start) {
      toast.error("La fecha de fin no debe ser anterior a la fecha de inicio");
      return false;
    }
    if (!promoDescription.trim()) {
      toast.error("Descripción obligatoria");
      return false;
    }
    return true;
  };


  const submitPromo = async () => {
    if (!Validate()) return;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8080/api/menu/${item.id}/promo`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          promoPrice: Number(promoPrice),
          promoDescription,
          promoStartDate: startDate,
          promoEndDate: endDate,
        }),
      });

      if (!response.ok) {
        toast.error(`Error del servidor: ${response.status}`);
        return;
      }

      const text = await response.text();
      toast.success(text);
      await fetchMenu();
      onClose();;
    } catch (error) {
      console.error("Error al agregar promo", error);
      toast.error("No se ha podido enviar la promo");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h3 className="text-xl font-bold mb-4 text-[#7A0000]">{item.name}</h3>
        <div className="mb-2">Precio actual: ${item.price.toFixed(2)}</div>
        <input
          type="number"
          placeholder="Nuevo precio"
          value={promoPrice}
          onChange={(e) => setPromoPrice(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Descripción de la promo"
          value={promoDescription}
          onChange={(e) => setPromoDescription(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <Button onClick={submitPromo}>Guardar promo</Button>
        <button onClick={onClose} className="mt-2 text-red-700 w-full">
          Cancelar
        </button>
      </div>
    </div>
  );
};

const PromoInfoModal = ({ item, onClose, abrirModalEditar, eliminarPromo }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h3 className="text-xl font-bold mb-4 text-[#7A0000]">{item.name} - Promo</h3>
        <p>Precio promo: ${item.promoPrice}</p>
        <p>Descripción: {item.promoDescription}</p>
        <p>Desde: {item.startDate}</p>
        <p>Hasta: {item.endDate}</p>
        <Button onClick={() => {
          abrirModalEditar(item);
          onClose();
        }}>
          Editar promo
        </Button>
        <Button onClick={() => eliminarPromo(item.id)}>Eliminar promo</Button>
        <button onClick={onClose} className="mt-2 text-[#740000] w-full">Cerrar</button>
      </div>
    </div>
  );
};

const MenuPromosAdmin = () => {
  const [menu, setMenu] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [promoInfoItem, setPromoInfoItem] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:8080/api/menu", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMenu(response.data);
    } catch (error) {
      console.error("Error al cargar el menú", error);
    }
  };

  const eliminarPromo = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/api/menu/${id}/promo`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Promo eliminada");
      setPromoInfoItem(null);
      fetchMenu();
    } catch (error) {
      console.error("Error al eliminar promo", error.response);
      toast.error(`Error al eliminar promo: ${error.response?.data || "Error desconocido"}`);
    }
  };

  const filtrado = menu
    .map((cat) => ({
      ...cat,
      items: (cat.items || []).filter(
        (item) =>
          (item.name && item.name.toLowerCase().includes(busqueda.toLowerCase())) ||
          (cat.name && cat.name.toLowerCase().includes(busqueda.toLowerCase()))
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Menú y Promociones</h2>
      <input
        type="text"
        placeholder="Buscar categoría o nombre del platillo..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="border px-4 py-2 w-full mb-6"
      />
      {filtrado.length > 0 ? (
        filtrado.map((category, index) => (
          <section key={category.id || index} className="mb-10">
            <h2 className="text-xl font-bold text-[#7A0000] mb-4">{category.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {category.items.map((item) => (
                <MenuCardsAdmin
                  key={item.id || item.name}
                  item={item}
                  abrirModal={setSelectedItem}
                  abrirPromoInfo={setPromoInfoItem}
                />
              ))}
            </div>
          </section>
        ))
      ) : (
        <p>No se encontraron resultados.</p>
      )}
      {selectedItem && (
        <PromoModal item={selectedItem} onClose={() => setSelectedItem(null)} fetchMenu={fetchMenu} />
      )}
      {promoInfoItem && (
        <PromoInfoModal
          item={promoInfoItem}
          onClose={() => setPromoInfoItem(null)}
          abrirModalEditar={setSelectedItem}
          eliminarPromo={eliminarPromo}
        />
      )}
    </div>
  );
};

export default MenuPromosAdmin;
