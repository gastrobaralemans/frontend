import { useNavigate } from "react-router-dom";
import Nav from "../layouts/nav";
import Banner from "../layouts/BannerIndex";
import CarouselModel from "../components/index/carousel";
import ReservasCards from "../layouts/reservas";
import Footer from "../components/footer";

const Home = () => {
    const navigate = useNavigate();

    const handleVerMenu = () => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/menu");
        } else {
            navigate("/register");
        }
    };

    return (
        <>
            <div className='p-4'>
                <Nav />
                    <Banner className="font-comfortaa text-3xl mt-8 mb-6" mensaje="Donde los sueños se convierten en platillos" />
                    <CarouselModel />
                    <Banner className="font-comfortaa text-3xl mt-10 mb-4" mensaje="¡Deliciosos platillos!" />

                    <div className="flex justify-center my-20">
                    <button onClick={handleVerMenu} className="px-4 py-2 bg-black text-white">
                        Ver menú completo
                    </button>
                    </div>

                    <Banner className="font-comfortaa text-3xl my-8" mensaje="¡Reservas para eventos!" />

                
                <ReservasCards />
                <Footer />
            </div>
        </>
    );
};

export default Home;
