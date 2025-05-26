import React from 'react';

const Banner = ({ mensaje }) => {
  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-[#7A0000]">
          {mensaje}
        </h2>
      </div>
    </div>
  );
};

export default Banner;
