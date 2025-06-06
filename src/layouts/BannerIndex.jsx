const Banner = ({ mensaje, className = "" }) => {
  return (
    <div className={`text-center text-2xl font-semibold text-[#740000] ${className}`}>
      {mensaje}
    </div>
  );
};

export default Banner;
