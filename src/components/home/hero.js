import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="px-[5%] max-w-8xl">
        <div className="relative flex flex-col items-center mt-5 z-10">
          <p className="text-xl sm:text-2xl font-semibold text-secondary ">
            WELCOME TO
          </p>
          <p className="text-3xl sm:text-4xl font-semibold text-primary mt-4">
            CITY LOGISTICS!
          </p>
          <div className="absolute left-1/2 transform -translate-x-1/2 top-14">
            <div className="relative w-[400px] h-[40vh] sm:w-[500px] sm:h-[50vh] md:w-[800px] md:h-[80vh] lg:w-[1000px] lg:h-[80vh]">
              <Image
                src="/images/hero_car.svg"
                alt="nav-logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
