/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import PrimaryButton from "../elements/primaryButton";

const benefits = [
  { text: "No Registration Fees", icon: "/images/document_icon.svg" },
  { text: "Weekly Payment", icon: "/images/money_icon.svg" },
  { text: "Good Mobile Application", icon: "/images/mobile_icon.svg" },
  { text: "Set Your Zones", icon: "/images/clock_icon.svg" },
  { text: "Choose Time Availability", icon: "/images/clock_icon.svg" },
  { text: "Full Time / Part Time", icon: "/images/timer_icon.svg" },
  { text: "Great Teams", icon: "/images/people_icon.svg" },
];

const DriverRecruitment = () => {
  return (
    <div className="mt-[60px] px-[5%]">
      <div className="flex justify-center items-center">
        <div className="relative w-full max-w-8xl flex flex-col md:flex-row md:justify-between">
          {/* Left Side */}
          <div className="flex flex-col justify-center md:w-[50%] lg:w-[40%]">
            <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-4">
              DO YOU WANT TO EARN WITH US?
            </h2>
            <p className="font-serif text-sm md:text-base mb-6">
              Our drivers are people-friendly, passionate about service, have a
              valid driver's license, and clean criminal records. Join our team
              and let's help solve our community delivery problem.
            </p>
            <div className="font-serif grid grid-cols-1 md:grid-cols-2 text-sm md:text-base space-y-2 mb-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <Image
                    src={benefit.icon}
                    alt="Check icon"
                    width={20}
                    height={20}
                    className="text-orange-500 mr-2"
                  />
                  {benefit.text}
                </div>
              ))}
            </div>
            <PrimaryButton>BECOME A DRIVER</PrimaryButton>
          </div>

          {/* Right Side */}
          <div className="hidden md:block md:w-[40%] lg:w-[55%]">
            <div className="relative h-72 md:h-full">
              <Image
                src="/images/earn_bg.svg" // Replace with your image path
                alt="Driver recruitment"
                layout="fill"
                objectFit="cover"
                className="rounded-r-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverRecruitment;
