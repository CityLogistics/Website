import { useFormik } from "formik";
import * as yup from "yup";
import FilledInput from "../elements/filledInput";
import PrimaryButton from "../elements/primaryButton";
import { useEffect, useState } from "react";
import ConfirmOrderModal from "./confirmationModal";
import { instance } from "@/apis";
import MapPicker from "../elements/mapPicker";
import Loader from "../Loader";
import {
  codeAddress,
  formatPhoneNumber,
  getDistace,
  getPrice,
  parseError,
} from "@/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PhoneInput from "../elements/phoneInput";
import { useSearchParams } from "next/navigation";
import DateTimePicker from "../elements/customDatePicker";

const OrderRequestForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (distance) => {
    setIsModalOpen(distance);
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
      .required("Sender's phone number is required")
      .test(
        "len",
        "Sender's phone number is invalid",
        (val) => val.length == 10
      ),
    recipientPhone: yup
      .string("Enter recipient's phone number")
      .required("Recipient's phone number is required")
      .test(
        "len",
        "Recipient's phone number is invalid",
        (val) => val.length == 10
      ),
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
    discription: yup.string("Enter description"),
    pickuptime: yup
      .string("Enter pickup time")
      .required("Pickup time is required"),
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
      pickuptime: "",
      vehicleType: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const { pickup, dropoff, senderPhone, recipientPhone } = values;
      const [pickupLoc, dropOffLoc] = await Promise.all([
        codeAddress(pickup),
        codeAddress(dropoff),
      ]);

      const payload = {
        destinations: [
          {
            lat: dropOffLoc.lat,
            lng: dropOffLoc.lng,
          },
        ],
        origins: [
          {
            lat: pickupLoc.lat,
            lng: pickupLoc.lng,
          },
        ],
      };
      const { distance, status } = await getDistace(payload);
      setLoading(false);
      if (status == "OK") {
        const { totalPrice } = getPrice({
          pickup: pickupLoc.province?.toUpperCase(),
          dropoff: dropOffLoc.province?.toUpperCase(),
          vehicleType: "SALON",
          distance: distance.value,
        });
        if (isNaN(totalPrice))
          toast.error("Invalid pickup or dropoff address ");
        else
          openModal({
            ...distance,
            pickUpProvince: pickupLoc.province,
            dropOffProvince: dropOffLoc.province,
            pickupLoc,
            dropOffLoc,
          });
      } else toast.error("Invalid pickup or dropoff address ");
    },
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onConfirm = async (vehicleType) => {
    const { pickupLoc, dropOffLoc } = isModalOpen;

    setLoading(true);
    const { senderPhone, recipientPhone, pickup, dropoff, ...values } =
      formik.values;

    try {
      const payload = {
        pickupDate: new Date().toISOString(),
        pickupPhoneNumber: formatPhoneNumber(senderPhone),
        dropOffPhoneNumber: formatPhoneNumber(recipientPhone),
        type: "HEALTH_AND_MEDICINE",
        ...values,
        vehicleType,
        pickupAddress: pickupLoc,
        dropOffAddress: dropOffLoc,
      };

      const { status, error, data } = await instance.post("/orders", payload);
      setLoading(false);
      closeModal();

      if (status == 201 && data) {
        router.push(data.paymentUrl);
      } else toast.error(parseError(error));
    } catch (error) {
      setLoading(false);

      toast.error(parseError(error));
    }
  };

  const handlePickUpLocationChange = (val, filed) => {
    formik.setFieldValue(filed, { ...val, address: val.description });
  };

  const search = useSearchParams();

  useEffect(() => {
    const res = JSON.parse(search.get("data"));
    // const res = JSON.parse(localStorage.getItem("payload"));
    if (res) formik.setValues(res);
  }, [search]);

  return (
    <div className="">
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
          value={formik.values?.senderName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.senderName && formik.errors.senderName}
        />

        <FilledInput
          type="email"
          name="email"
          title="Email"
          placeholder="you@company.com"
          value={formik.values?.email}
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
              value={formik.values?.pickup?.description}
              // onChange={handlePickUpLocationChange}
              onBlur={formik.handleBlur}
              // error={pickupError}
            />
          )}
          value={formik.values?.pickup?.description}
          onChange={(e) => handlePickUpLocationChange(e, "pickup")}
        />
        <PhoneInput
          type="tel"
          name="senderPhone"
          title="Pickup Phone Number"
          placeholder="Your phone number"
          value={formik.values?.senderPhone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.senderPhone && formik.errors.senderPhone}
        />

        <FilledInput
          type="date"
          name="pickUpDate"
          title="Pickup Date"
          placeholder="Pick a date"
          value={formik.values?.pickUpDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.pickUpDate && formik.errors.pickUpDate}
        />
        <FilledInput
          type="time"
          name="pickuptime"
          title="Pickup Time"
          placeholder="Select time..."
          value={formik.values.pickuptime}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.pickuptime && formik.errors.pickuptime}
        />
        {/* <DateTimePicker
          name="pickUpDate"
          label="Pickup Date"
          value={formik.values.pickUpDate}
          onChange={formik.handleChange}
          error={formik.touched.pickUpDate && formik.errors.pickUpDate}
        />

        <DateTimePicker
          name="pickUpTime"
          label="Pickup Time"
          value={formik.values.pickUpTime}
          onChange={formik.handleChange}
          error={formik.touched.pickUpTime && formik.errors.pickUpTime}
        /> */}
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
              value={formik.values.dropoff?.description}
              // onChange={handleDropOffLocationChange}
              onBlur={formik.handleBlur}
              // error={dropOffError}
            />
          )}
          value={formik.values.dropoff?.description}
          onChange={(e) => handlePickUpLocationChange(e, "dropoff")}
        />

        <PhoneInput
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
          <PrimaryButton
            type="submit"
            // disabled={!formik.isValid}
            customStyle="w-full"
          >
            {loading ? (
              <Loader dotClassess="bg-white" />
            ) : (
              "SUBMIT YOUR REQUEST"
            )}
          </PrimaryButton>
        </div>
      </form>
      <ConfirmOrderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        pickUpLocation={formik.values.pickup}
        dropOffLocation={formik.values.dropoff}
        onConfirm={onConfirm}
        preselectedVehicleType={formik.values.vehicleType}
        loading={loading}
      />
    </div>
  );
};

export default OrderRequestForm;
