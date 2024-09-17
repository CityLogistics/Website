/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import DeliveryForm from "./deliveryForm";

const RequestDelivery = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const cardRefs = useRef([]);

  useEffect(() => {
    // Set the height of all blue containers to match the tallest one
    if (cardRefs.current.length) {
      const maxHeight = Math.max(
        ...cardRefs.current.map((ref) => ref.clientHeight)
      );
      cardRefs.current.forEach((ref) => (ref.style.height = `${maxHeight}px`));
    }
  }, []);

  const handleSelection = (index) => {
    if (index === 0) {
      setSelectedOption(index);
    } else {
      setSelectedOption(null);
    }
  };

  const handlePickUpLocationChange = (e) => {
    setPickUpLocation(e.target.value);
  };

  const handleDropOffLocationChange = (e) => {
    setDropOffLocation(e.target.value);
  };

  const validationSchema = yup.object({
    senderName: yup
      .string("Enter sender's name")
      .required("Sender's name is required"),
    recipientName: yup
      .string("Enter recipient's name")
      .required("Recipient's name is required"),
    senderPhone: yup
      .string("Enter sender's phone number")
      .required("Sender's phone number is required"),
    recipientPhone: yup
      .string("Enter recipient's phone number")
      .required("Recipient's phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      senderName: "",
      recipientName: "",
      senderPhone: "",
      recipientPhone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = {
        ...values,
        pickUpLocation,
        dropOffLocation,
      };
      console.log(payload);
      // Add your form submission logic here
    },
  });

  return (
    <div className="flex justify-center">
      <div className="w-full mt-10 px-[5%] max-w-8xl">
        <h2 className="text-xl sm:text-2xl text-center font-semibold text-primary mb-8">
          OUR VEHICLES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 px-6 lg:px-[120px]">
          {deliveryOptions.map((option, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                ref={(el) => (cardRefs.current[index] = el)}
                className="relative w-full bg-[#05CFDF] text-black shadow-lg p-6 text-center flex flex-col justify-between rounded-[20px] h-full"
              >
                {/* Background image with dark overlay */}
                <div
                  className="relative w-full h-32 min-h-32 bg-cover bg-center rounded-lg"
                  style={{
                    backgroundImage: `url(${option.backgroundImage})`,
                    zIndex: 1,
                  }}
                >
                  <div className="absolute inset-0 bg-black opacity-80 rounded-lg"></div>
                  <img
                    src={option.image}
                    alt={option.title}
                    className="absolute inset-0 z-10 h-full w-full"
                  />
                </div>

                {/* Vehicle image */}
                <h3 className="text-lg md:text-xl md:m-2 ">{option.title}</h3>
                <p className="font-serif text-sm md:text-base md:mb-4 ">
                  {option.description}
                </p>
                <p className="text-lg md:text-xl ">{option.price}</p>
                {index !== 0 && (
                  <div>
                    <p className="font-serif text-sm md:text-base md:mb-2 ">
                      To get the price of this?
                    </p>
                    <a
                      href={`${
                        index === 1
                          ? "mailto:citylogistics101@gmail.com?subject=Quote Request for Large (Bus) Vehicle&body=I would like to request a quote for the Large (Bus) vehicle."
                          : "mailto:citylogistics101@gmail.com?subject=Quote Request for Extra Large (Truck) Vehicle&body=I would like to request a quote for the Extra Large (Truck) vehicle."
                      }`}
                    >
                      <button
                        type="button"
                        className="flex items-center justify-center w-full font-serif text-sm text-white md:text-base"
                      >
                        <p>Request a quote</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </button>
                    </a>
                  </div>
                )}
              </div>

              {/* Footer-like elements */}
              <div
                className={`relative w-[220px] h-[120px] mt-[40px] cursor-pointer rounded-[20px] ${
                  index === 0 ? "hover:bg-primary" : ""
                } ${
                  selectedOption === index ? "bg-primary" : "bg-[#EFEFEF] "
                } p-2 ${
                  index === 0 ? "ml-auto" : index === 1 ? "mx-auto" : "mr-auto"
                }`}
                onClick={() => handleSelection(index)}
              >
                <img
                  src={option.image}
                  alt={option.title}
                  className={`absolute bottom-0 h-[80%] w-full object-contain z-10`}
                />

                <p className="absolute inset-0 text-lg md:text-xl text-black z-0 flex justify-center">
                  {option.footerText}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pass necessary props to the form */}
        <DeliveryForm
          pickUpLocation={pickUpLocation}
          dropOffLocation={dropOffLocation}
          handlePickUpLocationChange={handlePickUpLocationChange}
          handleDropOffLocationChange={handleDropOffLocationChange}
          formik={formik}
        />
      </div>
    </div>
  );
};

export default RequestDelivery;

export const deliveryOptions = [
  {
    title: "SUV & MINIVAN FOR BELOW 50KG",
    description: "Parcels that optimally fit a standard SUV / Mini Van.",
    price: "$15.00 + $1/Km",
    image: "/images/suv_minivan.svg",
    backgroundImage: "/images/person-1.svg",
    footerText: "BELOW 50KG",
    value: "SALON",
  },
  {
    title: "LARGE (BUS)",
    description: "Parcels that optimally fit a standard pickup truck.",
    price: "",
    image: "/images/large_bus.svg",
    backgroundImage: "/images/person-2.svg",
    footerText: "LARGE",
    value: "FIVE_SEATER_SUV",
  },
  {
    title: "EXTRA LARGE (TRUCK)",
    description: 'Parcels that optimally fit a standard 10"-15" trailer truck.',
    price: "",
    image: "/images/extra_large_truck.svg",
    backgroundImage: "/images/person-3.svg",
    footerText: "EXTRA LARGE",
    value: "TRUCK",
  },
];
