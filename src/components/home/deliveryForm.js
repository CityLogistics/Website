import Image from "next/image";
import PrimaryButton from "../elements/primaryButton";

/* eslint-disable react/no-unescaped-entities */
const DeliveryForm = ({
  pickUpLocation,
  dropOffLocation,
  handlePickUpLocationChange,
  handleDropOffLocationChange,
  formik,
}) => {
  return (
    <div className="font-serif mt-[100px]">
      <div className="w-full bg-[#F9F9F9] rounded-[20px] shadow-lg px-6 py-[30px]">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center"
        >
          <div className="w-full grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Pick Up Location */}
            <div>
              <label
                className="block text-[12px] md:text-sm text-[#BDBDBD] mb-2"
                htmlFor="pickUpLocation"
              >
                Pick Up Location
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Image
                    src="/images/location-icon.svg"
                    alt="Location icon"
                    width={20}
                    height={20}
                  />
                </span>
                <input
                  type="text"
                  id="pickUpLocation"
                  name="pickUpLocation"
                  placeholder="Location here..."
                  value={pickUpLocation}
                  onChange={handlePickUpLocationChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-[10px] border-[#BDBDBD] focus:outline-none focus:ring-primary"
                />
              </div>
            </div>
            {/* Drop Off Location */}
            <div>
              <label
                className="block text-[12px] md:text-sm text-[#BDBDBD] mb-2"
                htmlFor="dropOffLocation"
              >
                Drop Off Location
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Image
                    src="/images/location-icon.svg"
                    alt="Location icon"
                    width={20}
                    height={20}
                  />
                </span>
                <input
                  type="text"
                  id="dropOffLocation"
                  name="dropOffLocation"
                  placeholder="Location here..."
                  value={dropOffLocation}
                  onChange={handleDropOffLocationChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-[10px] border-[#BDBDBD] focus:outline-none focus:ring-primary"
                />
              </div>
            </div>

            {/* Sender's Name */}
            <div>
              <label
                className="block text-[12px] md:text-sm text-[#BDBDBD] mb-2"
                htmlFor="senderName"
              >
                Sender's name?
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Image
                    src="/images/user-icon.svg"
                    alt="User icon"
                    width={20}
                    height={20}
                  />
                </span>
                <input
                  type="text"
                  id="senderName"
                  name="senderName"
                  placeholder="Name here..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.senderName}
                  className={`w-full pl-10 pr-4 py-2 border rounded-[10px] border-[#BDBDBD] focus:outline-none focus:ring-primary ${
                    formik.touched.senderName && formik.errors.senderName
                      ? "border-red-500"
                      : ""
                  }`}
                />
              </div>
              {formik.touched.senderName && formik.errors.senderName ? (
                <div className="text-rose-300 text-[12px] ml-1">
                  {formik.errors.senderName}
                </div>
              ) : null}
            </div>

            {/* Recipient's Name */}
            <div>
              <label
                className="block text-[12px] md:text-sm text-[#BDBDBD] mb-2"
                htmlFor="recipientName"
              >
                Recipient's name?
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Image
                    src="/images/user-icon.svg"
                    alt="User icon"
                    width={20}
                    height={20}
                  />
                </span>
                <input
                  type="text"
                  id="recipientName"
                  name="recipientName"
                  placeholder="Name here..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.recipientName}
                  className={`w-full pl-10 pr-4 py-2 border rounded-[10px] border-[#BDBDBD] focus:outline-none focus:ring-primary ${
                    formik.touched.recipientName && formik.errors.recipientName
                      ? "border-red-500"
                      : ""
                  }`}
                />
              </div>
              {formik.touched.recipientName && formik.errors.recipientName ? (
                <div className="text-rose-300 text-[12px] ml-1">
                  {formik.errors.recipientName}
                </div>
              ) : null}
            </div>
          </div>
          <div className="w-full md:w-1/2 grid sm:grid-cols-2 gap-6 mt-[30px]">
            {/* Sender's Phone Number */}
            <div>
              <label
                className="block text-[12px] md:text-sm text-[#BDBDBD] mb-2"
                htmlFor="senderPhone"
              >
                Sender's Phone Number?
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Image
                    src="/images/phone-icon.svg"
                    alt="Phone icon"
                    width={20}
                    height={20}
                  />
                </span>
                <input
                  type="text"
                  id="senderPhone"
                  name="senderPhone"
                  placeholder="Phone number here..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.senderPhone}
                  className={`w-full pl-10 pr-4 py-2 border rounded-[10px] border-[#BDBDBD] focus:outline-none focus:ring-primary ${
                    formik.touched.senderPhone && formik.errors.senderPhone
                      ? "border-red-500"
                      : ""
                  }`}
                />
              </div>{" "}
              {formik.touched.senderPhone && formik.errors.senderPhone ? (
                <div className="text-rose-300 text-[12px] ml-1">
                  {formik.errors.senderPhone}
                </div>
              ) : null}
            </div>

            {/* Recipient's Phone Number */}
            <div>
              <label
                className="block text-[12px] md:text-sm text-[#BDBDBD] mb-2"
                htmlFor="recipientPhone"
              >
                Recipient's Phone Number?
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Image
                    src="/images/phone-icon.svg"
                    alt="Phone icon"
                    width={20}
                    height={20}
                  />
                </span>
                <input
                  type="text"
                  id="recipientPhone"
                  name="recipientPhone"
                  placeholder="Phone number here..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.recipientPhone}
                  className={`w-full pl-10 pr-4 py-2 border rounded-[10px] border-[#BDBDBD] focus:outline-none focus:ring-primary ${
                    formik.touched.recipientPhone &&
                    formik.errors.recipientPhone
                      ? "border-red-500"
                      : ""
                  }`}
                />
              </div>{" "}
              {formik.touched.recipientPhone && formik.errors.recipientPhone ? (
                <div className="text-rose-300 text-[12px] ml-1">
                  {formik.errors.recipientPhone}
                </div>
              ) : null}
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center mt-[30px] ">
            <PrimaryButton type="submit" disabled={!formik.isValid}>
              SEND
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryForm;
