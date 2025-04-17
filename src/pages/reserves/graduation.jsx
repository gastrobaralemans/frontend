import React, {useState} from 'react'
import Input from '../../components/auth/input';
import Button from '../../components/auth/button';
const Graduation = () =>{
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [numero, setNumero] = useState('');
    const [fecha, setFecha] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [decoracion, setDecoracion] = useState('');
    const [comentarios, setComentarios] = useState('');

    const handleReserveGraduation = async (e) =>{
        e.preventDefault();
        if (!nombre ||!correo ||!numero ||!fecha ||!cantidad ||!decoracion ||!comentarios ){
            alert("campos obligatorios");
            return;
        }
        const data = {
            nombre:nombre,
            correo:correo,
            numero:numero,
            fecha:fecha,
            cantidad:cantidad,
            decoracion:decoracion,
            comentarios:comentarios
    };
    
    try {
        const response = await fetch("http://localhost:8080/api/auth/graduation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
    
        const text = await response.text();
        alert(text);
      } catch (error) {
        console.error(error);
        alert("No se ha podido enviar la solicitud");
      }
    };
        return(
        <>
         <div className='min-h-screen flex items-center justify-center'>
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-[#7A0000] mb-4">Reserva para graduación</h2>

                <form className="space-y-4" onSubmit={handleReserveGraduation}>
                    <Input type="text" name="nombre" placeholder="John Doe" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    <Input type="email" name="correo" placeholder="johndoe@mail.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                    <Input type="tel" name="numero" placeholder="0000-0000" value={numero} onChange={(e) => setNumero(e.target.value)}/>
                    <Input type="datetime-local" name="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)}/>
                    <Input type="number" name="cantidad" placeholder="n# personas" min={1} value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                    <Input type="text" name="decoracion" placeholder="¿decoracion especial?" value={decoracion} onChange={(e) => setDecoracion(e.target.value)} />
                    <Input type="text" name="comentarios" placeholder="comentarios" value={comentarios} onChange={(e) => setComentarios(e.target.value)}/>
                    <Button type="submit">Hacer reserva</Button>
                </form>
            </div>
            </div>
        </>
    );
  }
export default Graduation;