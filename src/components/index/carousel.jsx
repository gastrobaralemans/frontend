import { Carousel } from "flowbite-react";
const CarouselModel = () => {
  return (
    <div className="relative mx-auto mt-6 w-[80%] h-44 md:h-56 lg:h-64 xl:h-72 2xl:h-96 overflow-hidden rounded-xl shadow-md">
      <Carousel slide={true} indicators={true}>
        <img src="/carousel1.png" alt="Slide 1" />
        <img src="/carousel2.png" alt="Slide 2" />
        <img src="/carousel3.png" alt="Slide 3" />
      </Carousel>
    </div>
  );
};

export default CarouselModel;
