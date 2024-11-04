import { useFormik } from "formik";
import * as yup from "yup";
import FilledInput from "../elements/filledInput";
import PrimaryButton from "../elements/primaryButton";
import { Fragment, useEffect, useState } from "react";
import { instance } from "@/apis";
import MapPicker from "../elements/mapPicker";
import Loader from "../Loader";
import { codeAddress, formatPhoneNumber, parseError } from "@/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PhoneInput from "../elements/phoneInput";
import { useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

const ManualOrderRequestForm = ({ isOpen, onClose, vehicleType }) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

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
      .when("pickupDate", {
        is: (pickupDate, _) => {
          var pickupDateF = `${pickupDate?.getFullYear()},${pickupDate?.getMonth()},${pickupDate?.getDate()}`;
          var todayF = `${today.getFullYear()},${today.getMonth()},${today.getDate()}`;
          return pickupDateF == todayF;
        },
        then: (schema) =>
          schema.test(
            "is-future-time",
            "Pickup time must be later than the current time",
            (value) => {
              if (!value) return false;

              // Get the current time
              const now = new Date();
              const currentHours = now.getHours();
              const currentMinutes = now.getMinutes();

              // Split input time into hours and minutes
              const [inputHours, inputMinutes] = value.split(":").map(Number);

              // Compare input time to the current time
              return (
                inputHours > currentHours ||
                (inputHours === currentHours && inputMinutes > currentMinutes)
              );
            }
          ),
        otherwise: (schema) => schema.required("Pickup time is required"),
      })
      .required("Pickup time is required"),
    pickupDate: yup
      .date()
      .min(yesterday, "Pickup date cannot be in the past")
      .required("Pickup date is required")
      .typeError("Invalid date format"),
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

      pickupDate: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const {
        senderPhone,
        recipientPhone,
        pickup,
        dropoff,
        pickupDate,
        ...others
      } = values;

      try {
        const [pickupLoc, dropOffLoc] = await Promise.all([
          codeAddress(pickup),
          codeAddress(dropoff),
        ]);

        const payload = {
          pickupDate: pickupDate,
          pickupPhoneNumber: formatPhoneNumber(senderPhone),
          dropOffPhoneNumber: formatPhoneNumber(recipientPhone),
          type: "HEALTH_AND_MEDICINE",
          ...others,
          vehicleType,
          pickupAddress: pickupLoc,
          dropOffAddress: dropOffLoc,
        };

        const { status, error, data } = await instance.post(
          "/manual-orders",
          payload
        );
        setLoading(false);

        if (status == 201 && data) {
          toast.success("Order request sent");
          // onClose();
        } else toast.error(parseError(error));
      } catch (error) {
        setLoading(false);

        toast.error(parseError(error));
      }
    },
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handlePickUpLocationChange = (val, filed) => {
    formik.setFieldValue(filed, { ...val, address: val.description });
  };

  const search = useSearchParams();

  useEffect(() => {
    const submittedData = localStorage.getItem("submittedData");

    if (submittedData) {
      formik.setValues(JSON.parse(submittedData));
      localStorage.removeItem("submittedData");
    } else {
      const res = JSON.parse(search.get("data"));
      if (res) formik.setValues(res);
    }
  }, [search]);

  return (
    <Transition appear show={Boolean(isOpen)} as={Fragment}>
      <Dialog
        as="div"
        className="font-sans fixed inset-0 z-[99999999] flex items-center justify-center"
        onClose={() => null}
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
            <DialogPanel className="w-full h-full pb-6 mb-[10vh] bg-white text-left align-middle rounded-[20px] shadow-xl transition-all ">
              <div className="px-[5%]">
                <h2 className="text-lg font-bold mt-6 mb-4">Order Request</h2>
                <p className="text-sm mb-6 text-gray-500">
                  Please fill in the details below
                </p>
              </div>
              <button
                onClick={loading ? () => null : () => onClose()}
                className="absolute top-[-3px] right-[30px] sm:right-[40px] z-[99999] text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8 text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <form
                onSubmit={formik.handleSubmit}
                className="font-serif w-full h-[70vh]  px-[5%] overflow-y-auto"
              >
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
                      error={
                        formik.touched.pickup &&
                        formik.errors?.pickup?.description
                      }
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
                  error={
                    formik.touched.senderPhone && formik.errors.senderPhone
                  }
                />

                <FilledInput
                  type="date"
                  name="pickupDate"
                  title="Pickup Date"
                  placeholder="Pick a date"
                  value={formik.values?.pickupDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.pickupDate && formik.errors.pickupDate}
                />
                <FilledInput
                  type="time"
                  name="pickuptime"
                  title="Pickup Time"
                  placeholder="Select time..."
                  value={formik.values.pickuptime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.pickuptime && formik.errors?.pickuptime}
                />
                {/* <DateTimePicker
          name="pickupDate"
          label="Pickup Date"
          value={formik.values.pickupDate}
          onChange={formik.handleChange}
          error={formik.touched.pickupDate && formik.errors.pickupDate}
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
                  error={
                    formik.touched.recipientName && formik.errors.recipientName
                  }
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
                      error={
                        formik.touched.dropoff &&
                        formik.errors.dropoff?.description
                      }
                    />
                  )}
                  value={formik.values.dropoff}
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
                  error={
                    formik.touched.recipientPhone &&
                    formik.errors.recipientPhone
                  }
                />
                <FilledInput
                  type="text"
                  name="discription"
                  title="Item Description"
                  placeholder="Please give a full description (size, make, etc.) of the item..."
                  value={formik.values.discription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.discription && formik.errors.discription
                  }
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
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ManualOrderRequestForm;
