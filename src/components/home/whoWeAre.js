import Image from "next/image";

const WhoWeAre = () => {
  return (
    <div className="flex justify-center w-full">
      <div>
        <div className="flex flex-col md:flex-row items-center justify-between px-[5%] md:pr-[5%] md:pl-0 max-w-8xl bg-white">
          <div className="relative w-full md:w-[60%] h-64 md:h-[550px] mb-8 md:mb-0">
            <Image
              src="/images/who_bg.svg"
              alt="Delivery Van"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="md:w-[40%] text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-8">
              WHO WE ARE
            </h2>
            <p className="font-serif text-sm md:text-base">
              City Logistics is a dynamic and forward-thinking company that
              thrives on efficiency and innovation. Our team consists of
              experienced professionals who are passionate about logistics and
              dedicated to meeting your delivery needs. With a robust network
              and state-of-the-art technology, we ensure your packages reach
              their destination on time, every time.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center px-[5%] bg-white mt-8 md:mt-0">
          <p className="text-xl sm:text-2xl font-semibold text-primary mb-8">
            WHY CHOOSE US?
          </p>
          <div className="flex flex-col md:flex-row items-center justify-around w-full">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`flex flex-col items-center text-center ${feature.className} mb-10 md:mb-0`}
              >
                {feature.specialShape ? (
                  <div className="relative">
                    <div
                      className="bg-[url('/images/curve_bg.svg')] rounded-full w-full h-[450px] flex flex-col items-center justify-center p-5"
                      style={{
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                        backgroundOrigin: "content-box",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <Image
                        src={feature.imageSrc}
                        alt={feature.altText}
                        width={80}
                        height={80}
                      />
                      <h3 className="text-lg md:text-xl text-secondary mt-4">
                        {feature.title.split(" ")[0]}
                      </h3>
                      <h3 className="text-lg md:text-xl text-secondary">
                        {feature.title.split(" ")[1]}
                      </h3>
                      <p className="font-serif text-sm md:text-base mt-2 px-4">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Image
                      src={feature.imageSrc}
                      alt={feature.altText}
                      width={150}
                      height={150}
                    />
                    <h3 className="text-lg md:text-xl text-primary mt-4">
                      {feature.title}
                    </h3>
                    <p className="font-serif text-sm md:text-base mt-2">
                      {feature.description}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;

const features = [
  {
    id: 1,
    title: "SIMPLICITY",
    description: "We pick up and deliver almost anything you can think of.",
    imageSrc: "/images/boxes.svg",
    altText: "Simplicity Icon",
    className: "md:w-[25%]",
  },
  {
    id: 2,
    title: "EXCEPTIONAL CUSTOMER SUPPORT",
    description:
      "Our friendly and knowledgeable team is here to help you with any questions or concerns.",
    imageSrc: "/images/locks.svg",
    altText: "Customer Support Icon",
    className: "md:w-[50%]",
    specialShape: true, // flag to add the special shape
  },
  {
    id: 3,
    title: "WIDE COVERAGE",
    description:
      "Extensive delivery network covering local and provincial routes.",
    imageSrc: "/images/maps.svg",
    altText: "Wide Coverage Icon",
    className: "md:w-[25%]",
  },
];
