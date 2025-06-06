import React, { useState, useEffect } from 'react';
import Input from '../../components/auth/input';
import Button from '../../components/auth/button';
import Nav from '../../layouts/nav';
import Footer from '../../components/footer';
import {toast} from "sonner"

const Wedding = () => {
  const [user, setUser] = useState({ nombre: '', correo: '' });
  const [numero, setNumero] = useState('');
  const [fecha, setFecha] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [decoracion, setDecoracion] = useState('');
  const [comentarios, setComentarios] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.nombre && parsed.correo) {
          setUser(parsed);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, []);
  
  const handleReserveWedding = async (e) => {
    e.preventDefault();
    if (!numero || !fecha || !cantidad ) {
      toast.error('Campos obligatorios');
      return;
    }

    const data = {
      numero,
      fecha,
      cantidad,
      decoracion,
      comentarios,
      tipoEvento: 'boda'
    };
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Usuario no autenticado");
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const text = await response.text();
      toast.success(text);
    } catch (error) {
      console.error(error);
      toast.error('No se ha podido enviar la solicitud');
    }
  };

  return (
  <div className="min-h-screen flex flex-col">
    <Nav />

    <main className="flex-grow flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-[#7A0000] mb-4">Reserva para fiesta de bodas</h2>

        <form className="space-y-4" onSubmit={handleReserveWedding}>
          <Input type="text" name="nombre" value={user.nombre} readOnly />
          <Input type="email" name="correo" value={user.correo} readOnly />
          <Input type="tel" name="numero" placeholder="0000-0000" value={numero} onChange={(e) => setNumero(e.target.value)} />
          <Input type="datetime-local" name="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          <Input type="number" name="cantidad" placeholder="n# personas" min={1} value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
          <Input type="text" name="decoracion" placeholder="¿decoración especial?" value={decoracion} onChange={(e) => setDecoracion(e.target.value)} />
          <Input type="text" name="comentarios" placeholder="comentarios" value={comentarios} onChange={(e) => setComentarios(e.target.value)} />
          <Button type="submit">Hacer reserva</Button>
        </form>
      </div>
    </main>

    <Footer />
  </div>
);
};

export default Wedding;
