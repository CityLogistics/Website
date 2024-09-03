/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

const values = [
  {
    title: "CUSTOMER FOCUS",
    description:
      "Your satisfaction is our top priority. We tailor our services to meet your unique needs.",
    image: "/images/customer.svg", // Replace with your actual image path
  },
  {
    title: "RELIABILITY",
    description:
      "We deliver on our promise, ensuring your packages arrive safely and on time.",
    image: "/images/reliability.svg", // Replace with your actual image path
  },
  {
    title: "INNOVATION",
    description:
      "Continuously improving our processes, we bring you the best service possible.",
    image: "/images/innovation.svg", // Replace with your actual image path
  },
  {
    title: "INTEGRITY",
    description:
      "We conduct our business with honesty and transparency, building trust with every delivery.",
    image: "/images/integrity.svg", // Replace with your actual image path
  },
];

const AboutUs = () => {
  return (
    <div
      className="flex justify-center w-full bg-[url('/images/mission_bg.svg')] mt-[50px]"
      style={{
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundOrigin: "content-box",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="px-[5%] max-w-8x text-white py-10">
        <p className="text-xl sm:text-2xl text-center font-semibold mb-8">
          HERE'S WHAT SETS US APART!
        </p>

        {/* Mission Section */}
        <div className="w-full flex flex-col md:flex-row mb-6 md:mb-0 gap-6">
          <div className="relative w-full md:w-1/2 h-[150px] mb-4 md:mb-0">
            <Image
              src="/images/mission.svg" // Replace with your actual image path
              alt="Our Mission"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="md:w-1/2">
            <p className="text-lg md:text-xl mb-2">OUR MISSION</p>
            <p className="font-serif text-sm md:text-base">
              To deliver packages swiftly and safely, ensuring complete customer
              satisfaction through our reliable, innovative, and
              customer-centric services.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="w-full flex flex-col md:flex-row mb-6 md:mb-0 gap-6 mt-[30px]">
          <div className="md:w-1/2">
            <p className="text-lg md:text-xl mb-2">OUR VISION</p>
            <p className="font-serif text-sm md:text-base">
              To become the leading delivery service provider, known for our
              efficiency, reliability, and commitment to excellence in every
              delivery we make.
            </p>
          </div>
          <div className="relative w-full md:w-1/2 h-[150px] mb-4 md:mb-0">
            <Image
              src="/images/vision.svg" // Replace with your actual image path
              alt="Our Vision"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="w-full mt-[50px] mb-8">
          <p className="text-xl sm:text-2xl text-center font-semibold text-white mb-6">
            OUR VALUES
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 mt-10 mb-10 px-6 lg:px-[100px] text-black">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-[20px] shadow-lg p-6 w-full text-center"
              >
                <img
                  src={value.image}
                  alt={value.title}
                  className="h-32 w-full rounded-[10px] object-cover mb-4"
                />
                <h3 className="text-lg md:text-xl mb-2">{value.title}</h3>
                <p className="font-serif text-sm md:text-base">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
