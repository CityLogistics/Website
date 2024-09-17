/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from "react";
import { deliveryOptions } from "../home/requestDelivery";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import FilledInput from "../elements/filledInput";
import PrimaryButton from "../elements/primaryButton";
import { getPrice } from "@/utils";

const ConfirmOrderModal = ({
  isOpen,
  onClose,
  pickUpLocation,
  dropOffError,
  pickupError,
  dropOffLocation,
  handleDropOffLocationChange,
  handlePickUpLocationChange,
  onConfirm,
}) => {
  const [selectedOption, setSelectedOption] = useState(deliveryOptions[0]);
  const handleSelection = (index) => {
    setSelectedOption(index);
  };

  if (!isOpen) return null;
  const { pickUpProvince, dropOffProvince, value } = isOpen;

  const price = getPrice({
    pickup: pickUpProvince?.toUpperCase(),
    dropoff: dropOffProvince?.toUpperCase(),
    vehicleType: selectedOption.value,
    distance: value,
  });

  return (
    <Transition appear show={Boolean(isOpen)} as={Fragment}>
      <Dialog
        as="div"
        className="font-sans fixed inset-0 z-[99999999] flex items-center justify-center"
        onClose={onClose}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="relative w-full max-w-[90%] md:max-w-[60%] h-[90vh] mt-[5vh] flex items-center justify-center">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="w-full h-full px-[5%] pt-6 mb-[10vh] bg-white text-left align-middle rounded-[20px] shadow-xl transition-all overflow-y-auto">
              <div className=" ">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-0 right-4 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <h2 className="font-sans text-lg sm:text-xl text-center font-semibold text-primary">
                  PLEASE SELECT A VEHICLE TO CONFIRM YOUR ORDER REQUEST
                </h2>

                {/* Vehicle Options */}
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  {deliveryOptions.slice(0, 1).map((option, index) => (
                    <div
                      key={index}
                      className={`relative w-[220px] h-[120px] mt-[40px] cursor-pointer rounded-[20px] ${
                        selectedOption.value === option.value
                          ? "bg-primary"
                          : "bg-[#EFEFEF] hover:bg-primary"
                      } p-2 ${
                        index === 0
                          ? "ml-auto"
                          : index === 1
                          ? "mx-auto"
                          : "mr-auto"
                      }`}
                      onClick={() => handleSelection(option)}
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
                  ))}
                </div>

                {/* Address and Price Information */}
                <div className="flex flex-col gap-4 mb-4">
                  <div>
                    <FilledInput
                      type="text"
                      name="pickUpLocation"
                      title="Pick Up Location"
                      placeholder="The pick-up address"
                      value={pickUpLocation.description}
                      onChange={handlePickUpLocationChange}
                      onBlur={pickupError}
                      error={pickupError}
                      disabled
                    />
                    {pickupError && (
                      <div className="text-rose-300 text-[12px] ml-1">
                        {pickupError}
                      </div>
                    )}
                  </div>
                  <div>
                    <FilledInput
                      type="text"
                      name="dropOffLocation"
                      title="Drop Off Location"
                      placeholder="The drop-off address"
                      value={dropOffLocation.description}
                      onChange={handleDropOffLocationChange}
                      onBlur={dropOffError}
                      error={dropOffError}
                      disabled
                    />
                    {dropOffError && (
                      <div className="text-rose-300 text-[12px] ml-1">
                        {dropOffError}
                      </div>
                    )}
                  </div>
                </div>
                <FilledInput
                  type="text"
                  name="price"
                  title="Total to Pay:"
                  customStyle="h-[60px] text-xl text-black"
                  value={`$${price / 100}`}
                  disabled
                />
                {/* Confirm Button */}
                <div className="flex justify-center mt-6">
                  <PrimaryButton
                    type="submit"
                    handleClick={() => onConfirm(selectedOption.value)}
                  >
                    CONFIRM YOUR REQUEST
                  </PrimaryButton>
                </div>

                {/* Go Back */}
                <div className="flex justify-center my-4">
                  <button
                    className="text-[#4F4F4F] hover:text-primary ml-3"
                    onClick={onClose}
                  >
                    &lt; Go Back
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmOrderModal;
