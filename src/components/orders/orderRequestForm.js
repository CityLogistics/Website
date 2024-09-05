import { useFormik } from "formik";
import * as yup from "yup";
import FilledInput from "../elements/filledInput";
import PrimaryButton from "../elements/primaryButton";
import { useEffect, useState } from "react";
import ConfirmOrderModal from "./confirmationModal";
import { instance } from "@/apis";
import MapPicker from "../elements/mapPicker";

const OrderRequestForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const validationSchema = yup.object({
    email: yup
      .string("Enter Email")
      .email("Email is invalid")
      .required("Email is required"),
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
      address: yup
        .string("Enter pick up address")
        .required("Pick up address is required"),
    }),
    dropoff: yup.object({
      address: yup
        .string("Enter drop off address")
        .required("Drop off address is required"),
    }),
    discription: yup
      .string("Enter discription")
      .required("Discription is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      senderName: "",
      recipientName: "",
      senderPhone: "",
      recipientPhone: "",
      discription: "",
      dropoff: {},
      pickup: {},
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      openModal();
    },
  });

  const onConfirm = async () => {
    closeModal();
    const { senderPhone, recipientPhone, pickup, dropoff, ...values } =
      formik.values;
    try {
      const payload = {
        pickupDate: new Date().toISOString(),
        pickupPhoneNumber: senderPhone,
        dropOffPhoneNumber: recipientPhone,
        type: "HEALTH_AND_MEDICINE",
        vehicleType: "SALON",
        ...values,
        pickupAddress: pickup,
        dropOffAddress: dropoff,
      };
      const res = await instance.post("/orders", payload);
      console.info({ res });
    } catch (error) {}
  };

  const handlePickUpLocationChange = (val, filed) => {
    console.info({ val, filed });
    formik.setFieldValue(filed, { ...val, address: val.description });
  };

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("payload"));
    formik.setValues(res);
    console.info({ res });
  }, []);
  console.info(formik.values);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="font-serif w-full">
        <h2 className="text-lg font-bold mb-4">Order Request</h2>
        <p className="text-sm mb-6 text-gray-500">
          Please fill in the details below
        </p>

        <FilledInput
          type="text"
          name="senderName"
          title="Sender's Name"
          placeholder="Your name"
          value={formik.values.senderName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.senderName && formik.errors.senderName}
        />

        <FilledInput
          type="email"
          name="email"
          title="Email"
          placeholder="you@company.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
        />

        <MapPicker
          inputField={() => (
            <FilledInput
              type="text"
              name="pickup"
              title="Pick Up Location"
              placeholder="The pick-up address"
              value={formik.values.pickup?.address}
              // onChange={handlePickUpLocationChange}
              onBlur={formik.handleBlur}
              // error={pickupError}
            />
          )}
          value={formik.values.pickup?.address}
          onChange={(e) => handlePickUpLocationChange(e, "pickup")}
        />
        <FilledInput
          type="tel"
          name="senderPhone"
          title="Pickup Phone Number"
          placeholder="Your phone number"
          value={formik.values.senderPhone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.senderPhone && formik.errors.senderPhone}
        />

        <FilledInput
          type="date"
          name="pickUpDate"
          title="Pickup Date"
          placeholder="Pick a date"
          value={formik.values.pickUpDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.pickUpDate && formik.errors.pickUpDate}
        />
        <FilledInput
          type="time"
          name="pickupTime"
          title="Pickup Time"
          placeholder="Select time..."
          value={formik.values.pickupTime}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.pickupTime && formik.errors.pickupTime}
        />

        <FilledInput
          type="text"
          name="recipientName"
          title="Drop-off Recipient's Name"
          placeholder="The recipient's name"
          value={formik.values.recipientName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.recipientName && formik.errors.recipientName}
        />

        <MapPicker
          inputField={() => (
            <FilledInput
              type="text"
              name="dropOffLocation"
              title="Drop Off Location"
              placeholder="The drop-off address"
              value={formik.values.dropoff?.address}
              // onChange={handleDropOffLocationChange}
              onBlur={formik.handleBlur}
              // error={dropOffError}
            />
          )}
          value={formik.values.dropoff?.address}
          onChange={(e) => handlePickUpLocationChange(e, "dropoff")}
        />

        <FilledInput
          type="tel"
          name="recipientPhone"
          title="Drop-off Phone Number"
          placeholder="Drop-off phone number"
          value={formik.values.recipientPhone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.recipientPhone && formik.errors.recipientPhone}
        />
        <FilledInput
          type="text"
          name="discription"
          title="Item Description"
          placeholder="Describe the item..."
          value={formik.values.discription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.discription && formik.errors.discription}
        />

        <div className="flex justify-center mt-6">
          <PrimaryButton type="submit" disabled={!formik.isValid}>
            SUBMIT YOUR REQUEST
          </PrimaryButton>
        </div>
      </form>
      <ConfirmOrderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        pickUpLocation={formik.values.pickup?.address}
        // pickupError={pickupError}
        // dropOffError={dropOffError}
        dropOffLocation={formik.values.dropoff?.address}
        // handleDropOffLocationChange={handleDropOffLocationChange}
        // handlePickUpLocationChange={handlePickUpLocationChange}
        onConfirm={onConfirm}
      />
    </div>
  );
};

export default OrderRequestForm;
