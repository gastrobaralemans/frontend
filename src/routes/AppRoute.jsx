import Home from "../pages/Index.jsx"
import Login from "../pages/auth/login.jsx"
import Register from "../pages/auth/register.jsx"
import Birthday from "../pages/reserves/birthday.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRouter = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/birthdayreserve" element={<Birthday/>}/>
            </Routes>
        </BrowserRouter>
    );
}
export default AppRouter;