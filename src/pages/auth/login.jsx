import {Link} from 'react-router-dom'
import Input from '../../components/auth/input';
import Button from '../../components/auth/button';
const Login = () =>{
    return(
        <>
            <div className='min-h-screen flex items-center justify-center'>
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-red-800 mb-4">Iniciar sesión</h2>

                <form className="space-y-4">
                <Input type="text" placeholder="John Doe" />
                <Input type="email" placeholder="johndoe@mail.com" />
                <Button type="submit">Iniciar sesión</Button>
                </form>

                <p className="text-center mt-4 text-sm">
                ¿No tienes cuenta?{" "}
                <Link to={"/register"} className="text-red-800 hover:underline">
                    Registrate
                </Link>
                </p>
            </div>
            </div>
        </>
    );
}
export default Login;