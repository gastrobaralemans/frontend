import { useNavigate } from "react-router-dom";
import Nav from "../layouts/nav";
import Banner from "../layouts/BannerIndex";
import Carousel from "../components/index/carousel";
import ReservasCards from "../layouts/reservas";
import Footer from "../components/footer";

const Home = () => {
    const navigate = useNavigate();

    const handleVerMenu = () => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/menu");
        } else {
            navigate("/login");
        }
    };

    return (
        <>
            <div className='p-4'>
                <Nav />
                <Banner mensaje='"Donde los sueños se convierten en platillos"' />
                <Carousel />
                <Banner mensaje="¡Deliciosos platillos!" />

                <div className="flex justify-center my-4">
                    <button onClick={handleVerMenu} className="px-4 bg-black text-white py-2">
                        Ver menú completo
                    </button>
                </div>

                <Banner mensaje="¡Reservas para eventos!" />
                <ReservasCards />
                <Footer />
            </div>
        </>
    );
};

export default Home;
