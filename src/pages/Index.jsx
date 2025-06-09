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

                <section className="text-center max-w-4xl mx-auto px-4 py-12 space-y-10">
                    <Banner className="font-comfortaa text-3xl text-[#740000]" mensaje="¡Deliciosos platillos!" />

                    <button
                        onClick={handleVerMenu}
                        className="px-6 py-2 bg-black text-white"
                    >
                        Ver menú completo
                    </button>

                    <Banner className="font-comfortaa text-3xl text-[#740000]" mensaje="¡Reservas para eventos!" />
                </section>
                <ReservasCards />
                <Footer />
            </div>
        </>
    );
};

export default Home;
