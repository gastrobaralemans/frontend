import Input from '../../components/auth/input';
import Button from '../../components/auth/button';
const Wedding = () =>{
    return(
        <>
         <div className='min-h-screen flex items-center justify-center'>
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-[#7A0000] mb-4">Reserva para fiestas de bodas</h2>

                <form className="space-y-4">
                    <Input type="text" name="nombre" placeholder="John Doe" />
                    <Input type="email" name="correo" placeholder="johndoe@mail.com" />
                    <Input type="tel" name="numero" placeholder="0000-0000" />
                    <Input type="datetime-local" name="fecha"/>
                    <Input type="number" name="cantidad" placeholder="n# personas" min={1} />
                    <Input type="text" name="decoracion" placeholder="¿decoracion especial?" />
                    <Input type="text" name="comentarios" placeholder="comentarios" />
                    <Button type="submit">Hacer reserva</Button>
                </form>
            </div>
            </div>
        </>
    );
}
export default Wedding;