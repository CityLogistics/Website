import Image from "next/image";
import PrimaryButton from "../elements/primaryButton";

import Script from "next/script";
import MapPicker from "../elements/mapPicker";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

/* eslint-disable react/no-unescaped-entities */
const DeliveryForm = ({ pickUpLocation, dropOffLocation }) => {
  const ready = async () => {};

  const handlePickUpLocationChange = (val, filed) => {
    formik.setFieldValue(filed, val);
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
    pickup: yup.object({
      description: yup
        .string("Enter pick up address")
        .required("Pick up address is required"),
    }),
    dropoff: yup.object({
      description: yup
        .string("Enter drop off address")
        .required("Drop off address is required"),
    }),
  });

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      senderName: "",
      recipientName: "",
      senderPhone: "",
      recipientPhone: "",
      dropoff: {},
      pickup: {},
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      localStorage.setItem("payload", JSON.stringify(values));
      router.push("/order-request");
      // Add your form submission logic here
    },
  });

  return (
    <div className="font-serif mt-[100px]">
      <h2 className="text-xl sm:text-2xl text-center font-semibold text-primary mb-2">
        REQUEST AN ONLINE DELIVERY
      </h2>
      <Script
        onReady={ready}
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAP_KEY}&libraries=places`}
      />
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
              {/* <MapPicker
                value={formik.values.pickup?.description}
                onChange={(e) => handlePickUpLocationChange(e, "pickup")}
              /> */}
              {formik.touched.pickup && formik.errors.pickup ? (
                <div className="text-rose-300 text-[12px] ml-1">
                  {formik.errors.pickup.description}
                </div>
              ) : null}
            </div>
            {/* Drop Off Location */}
            <div>
              <label
                className="block text-[12px] md:text-sm text-[#BDBDBD] mb-2"
                htmlFor="dropOffLocation"
              >
                Drop Off Location
              </label>
              {/* <MapPicker
                value={formik.values.dropoff?.description}
                onChange={(e) => handlePickUpLocationChange(e, "dropoff")}
              /> */}
              {formik.touched.dropoff && formik.errors.dropoff ? (
                <div className="text-rose-300 text-[12px] ml-1">
                  {formik.errors.dropoff.description}
                </div>
              ) : null}
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
