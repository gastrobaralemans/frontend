const Input = ({ type = "text", name, placeholder, value, onChange, min, readOnly }) => {
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        readOnly={readOnly}
        className="w-full p-2 border border-black"
      />
    );
  };
  
  export default Input;
  