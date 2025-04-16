import Nav from "../layouts/nav";
import Banner from "../layouts/BannerIndex";
import Carousel from "../components/index/carousel";
import ReservasCards from "../layouts/reservas";
import Footer from "../components/footer";
const Home =() =>{
    return(
        <>
            <div className='p-4'>
                <Nav/>
                <Banner mensaje='"Donde los sueños se convierten en platillos"' />
                <Carousel/>
                <Banner mensaje="¡Deliciosos platillos!" />
                <Banner mensaje="¡Reservas para eventos!" />
                <ReservasCards/>
                <Footer/>
            </div>
        </>
    );
};
export default Home;