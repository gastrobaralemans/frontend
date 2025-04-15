const Button = ({children, onClick, type = "button"}) =>{
    return(
        <button
            type={type}
            onClick={onClick}
            className="w-full bg-black text-white py-2"
        >
            {children}
        </button>
    )
};

export default Button;