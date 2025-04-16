import Nav from "../layouts/nav";
import Banner from "../layouts/BannerIndex";
import Carousel from "../components/index/carousel";
const Home =() =>{
    return(
        <>
            <div className='p-4'>
                <Nav/>
                <Banner/>
                <Carousel/>
            </div>
        </>
    );
};
export default Home;