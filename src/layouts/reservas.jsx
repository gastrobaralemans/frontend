import Button from '../components/auth/button';
import React from 'react';

const ReservasCards = () =>{
    const events = [
        {
          title: "Cumpleaños",
          description: "Celebra tu cumpleaños con nosotros y vive una experiencia inolvidable! Disfruta de un ambiente acogedor, platillos exquisitos y un servicio excepcional. Personaliza tu evento con música, decoración y menús especiales para ti y tus invitados.",
          image: "/cumple.png"
        },
        {
          title: "Fiesta de bodas",
          description: "Haz de tu boda un evento único e inolvidable en nuestro restaurante. Contamos con espacios elegantes, un menú personalizado y un equipo dedicado a hacer realidad tu celebración soñada. Cuidamos cada detalle para que vivas un día mágico junto a tus seres queridos.",
          image: "/bodas.png"
        },
        {
          title: "Graduaciones",
          description: "Celebra tu logro con una cena especial en compañía de familiares y amigos. Ofrecemos un ambiente exclusivo, platillos deliciosas y opciones de menú adaptadas a grupos. Haz de tu graduación un momento especial con nuestra atención personalizada.",
          image: "/graduation.png"
        }
      ];
    
      return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                    <div className="h-48 overflow-hidden">
                        <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                        <h2 className="text-2xl font-bold text-[#7A0000] mb-4">{event.title}</h2>
                        <p className="text-gray-600 mb-6 flex-grow">{event.description}</p>
                        <div className="mt-auto">
                            <Button className="w-full">Reserva Ahora</Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default ReservasCards;