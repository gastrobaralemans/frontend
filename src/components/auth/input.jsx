const Input = ({type = "text", placeholder}) =>{
    return(
        <input
            type={type} 
            placeholder={placeholder}
            className="w-full p-2 border border-black"   
        />
            
    );
}
export default Input;