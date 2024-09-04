import { useFormik } from "formik";
import * as yup from "yup";
import FilledInput from "../elements/filledInput";
import PrimaryButton from "../elements/primaryButton";
import { useState } from "react";
import ConfirmOrderModal from "./confirmationModal";

const OrderRequestForm = () => {
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [pickupError, setPickUpError] = useState(null);
  const [dropOffError, setDropOffError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  console.log(pickupError, dropOffError);
  const handlePickUpLocationChange = (e) => {
    setPickUpLocation(e.target.value);
  };

  const handleDropOffLocationChange = (e) => {
    setDropOffLocation(e.target.value);
  };
  // Validation schema
  const validationSchema = yup.object({
    senderName: yup.string().required("Sender's name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    pickUpPhoneNumber: yup.string().required("Pickup phone number is required"),
    pickUpDate: yup.date().required("Pickup date is required"),
    pickupTime: yup
      .string("Select pickup time")
      .required("Pickup time is required"),
    dropOffRecipientName: yup.string().required("Recipient's name is required"),
    dropOffPhoneNumber: yup
      .string()
      .required("Drop-off phone number is required"),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      senderName: "",
      email: "",
      pickUpPhoneNumber: "",
      pickUpDate: "",
      dropOffRecipientName: "",
      dropOffPhoneNumber: "",
      pickupTime: "",
      itemDescription: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Custom validation for pickUpLocation and dropOffLocation

      // if (pickUpLocation === "") {
      //   setPickUpError("Please choose a pick-up location");
      // }
      // if (dropOffLocation === "") {
      //   setDropOffError("Please choose a drop-off location");
      // }

      // if (!pickupError && !dropOffError) {
      //   const payload = {
      //     ...values,
      //     pickUpLocation,
      //     dropOffLocation,
      //   };
      //   console.log(payload);
      // }
      openModal();
    },
  });

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

        <div>
          <FilledInput
            type="text"
            name="pickUpLocation"
            title="Pick Up Location"
            placeholder="The pick-up address"
            value={pickUpLocation}
            onChange={handlePickUpLocationChange}
            onBlur={formik.handleBlur}
            error={pickupError}
          />
          {pickupError && (
            <div className="text-rose-300 text-[12px] ml-1">{pickupError}</div>
          )}
        </div>

        <FilledInput
          type="tel"
          name="pickUpPhoneNumber"
          title="Pickup Phone Number"
          placeholder="Your phone number"
          value={formik.values.pickUpPhoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.pickUpPhoneNumber && formik.errors.pickUpPhoneNumber
          }
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
          name="dropOffRecipientName"
          title="Drop-off Recipient's Name"
          placeholder="The recipient's name"
          value={formik.values.dropOffRecipientName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.dropOffRecipientName &&
            formik.errors.dropOffRecipientName
          }
        />

        <div>
          <FilledInput
            type="text"
            name="dropOffLocation"
            title="Drop Off Location"
            placeholder="The drop-off address"
            value={dropOffLocation}
            onChange={handleDropOffLocationChange}
            onBlur={formik.handleBlur}
            error={dropOffError}
          />
          {dropOffError && (
            <div className="text-rose-300 text-[12px] ml-1">{dropOffError}</div>
          )}
        </div>

        <FilledInput
          type="tel"
          name="dropOffPhoneNumber"
          title="Drop-off Phone Number"
          placeholder="Drop-off phone number"
          value={formik.values.dropOffPhoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.dropOffPhoneNumber &&
            formik.errors.dropOffPhoneNumber
          }
        />
        <FilledInput
          type="text"
          name="itemDescription"
          title="Item Description"
          placeholder="Describe the item..."
          value={formik.values.itemDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.itemDescription && formik.errors.itemDescription
          }
        />

        <div className="flex justify-center mt-6">
          <PrimaryButton
            type="submit"
            // disabled={!formik.isValid}
          >
            SUBMIT YOUR REQUEST
          </PrimaryButton>
        </div>
      </form>
      <ConfirmOrderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        pickUpLocation={pickUpLocation}
        pickupError={pickupError}
        dropOffError={dropOffError}
        dropOffLocation={dropOffLocation}
        handleDropOffLocationChange={handleDropOffLocationChange}
        handlePickUpLocationChange={handlePickUpLocationChange}
      />
    </div>
  );
};

export default OrderRequestForm;
