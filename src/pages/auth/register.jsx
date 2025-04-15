import {Link} from 'react-router-dom'
import Input from '../../components/auth/input';
import Button from '../../components/auth/button';
const Register = () =>{
    return(
        <>
         <div className='min-h-screen flex items-center justify-center'>
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-[#7A0000] mb-4">Crear cuenta</h2>

                <form className="space-y-4">
                <Input type="text" placeholder="John Doe" />
                <Input type="email" placeholder="johndoe@mail.com" />
                <Input type="password" placeholder="********"/>
                <Button type="submit">Crear cuenta</Button>
                </form>

                <p className="text-center mt-4 text-sm">
                ¿Ya tienes cuenta?{" "}
                <Link to={"/login"} className="text-[#7A0000] hover:underline">
                    Inicia sesión
                </Link>
                </p>
            </div>
            </div>
        </>
    );s
}
export default Register;