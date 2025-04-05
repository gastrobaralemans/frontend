import Home from "../pages/Index.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRouter = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    );
}
export default AppRouter;