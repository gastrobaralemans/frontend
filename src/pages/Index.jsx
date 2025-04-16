import Nav from "../layouts/nav";
import Banner from "../layouts/BannerIndex";
const Home =() =>{
    return(
        <>
            <div className='p-4'>
                <Nav/>
                <Banner/>
            </div>
        </>
    );
};
export default Home;