import { useNavigate } from 'react-router-dom';
import Button from '../components/auth/button';


const ReservasCards = () => {
    const navigate = useNavigate();

    const events = [
        {
            title: "Cumpleaños",
            description:
                "¡Celebra tu cumpleaños con nosotros y vive una experiencia inolvidable! Disfruta de un ambiente acogedor, platillos exquisitos y un servicio excepcional. Personaliza tu evento con música, decoración y menús especiales para ti y tus invitados.",
            image: "/cumple.png",
            path: "/birthdayreserve",
        },
        {
            title: "Fiesta de bodas",
            description:
                "Haz de tu boda un evento único e inolvidable en nuestro restaurante. Contamos con espacios elegantes, un menú personalizado y un equipo dedicado a hacer realidad tu celebración soñada. Cuidamos cada detalle para que vivas un día mágico junto a tus seres queridos.",
            image: "/bodas.png",
            path: "/weddingreserve",
        },
        {
            title: "Graduaciones",
            description:
                "Celebra tu logro con una cena especial en compañía de familiares y amigos. Ofrecemos un ambiente exclusivo, platillos deliciosos y opciones de menú adaptadas a grupos. Haz de tu graduación un momento especial con nuestra atención personalizada.",
            image: "/graduation.png",
            path: "/graduationreserve",
        },
    ];

    return (
        <div className="max-w-6xl mx-auto py-12 space-y-16 px-4">
            {events.map((event, index) => (
                <div
                    key={index}
                    className={`flex flex-col md:flex-row items-stretch gap-8 transition-transform duration-300 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''
                        }`}
                >
                    <div className="w-full md:w-1/2 overflow-hidden rounded-[75px] h-full">
                        <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col justify-between p-6">
                        <div>
                            <h2 className="text-3xl font-semibold text-[#7A0000] mb-4">{event.title}</h2>
                            <p className="text-gray-800 text-justify">{event.description}</p>
                        </div>
                        <div className="mt-6">
                            <Button
                                className="bg-black text-white w-full"

                                onClick={() => {
                                    const token = localStorage.getItem('token');
                                    if (token) {
                                        navigate(event.path);
                                    } else {
                                        navigate('/register')
                                    }
                                }
                                }
                            >
                                Reservar ahora
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReservasCards;
