/* eslint-disable react/no-unescaped-entities */
import { useFormik } from "formik";
import * as yup from "yup";
import FilledInput from "../elements/filledInput";
import Dropdown from "../elements/dropdown";
import PrimaryButton from "../elements/primaryButton";

const DriverRequestForm = () => {
  // Validation schema
  const validationSchema = yup.object({
    driverName: yup.string().required("Driver's name is required"),
    phoneNumber: yup.string().required("Phone number is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    vehicle: yup.string().required("Vehicle type is required"),
    license: yup.string().required("Valid license is required"),
    insurance: yup.string().required("Insurance status is required"),
    availability: yup.string().required("Availability is required"),
    timeAvailable: yup.string().required("Time available is required"),
    deliveryZone: yup.string().required("Delivery zone is required"),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      driverName: "",
      phoneNumber: "",
      email: "",
      vehicle: "",
      license: "",
      insurance: "",
      availability: "",
      timeAvailable: "",
      deliveryZone: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      toast.success("Your request has been sent", {
        duration: 4000,
      });

      toast.error("Something went wrong", {
        duration: 4000,
      });
    },
  });

  const vehicleOptions = [
    { value: "", title: "Select vehicle" },
    { value: "sedan", title: "Sedan/Salon" },
    { value: "suv", title: "SUV" },
    { value: "truck", title: "Truck" },
  ];

  const availabilityOptions = [
    { value: "", title: "Select availability" },
    { value: "monday", title: "Mondays" },
    { value: "tuesday", title: "Tuesdays" },
    { value: "wednesday", title: "Wednesdays" },
    { value: "thursday", title: "Thursdays" },
    { value: "friday", title: "Fridays" },
  ];

  const timeOptions = [
    { value: "", title: "Select time available" },
    { value: "morning", title: "Mornings (8 am to 12 noon)" },
    { value: "afternoon", title: "Afternoons (12 pm to 5 pm)" },
    { value: "evening", title: "Evenings (5 pm to 9 pm)" },
  ];

  const deliveryZoneOptions = [
    { value: "", title: "Select preferred delivery zone" },
    { value: "west", title: "West side" },
    { value: "east", title: "East side" },
    { value: "north", title: "North side" },
    { value: "south", title: "South side" },
  ];

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="font-serif w-full">
        <h2 className="text-lg font-bold mb-4">Driver's Pre-Qualification</h2>
        <p className="text-sm mb-6 text-gray-500">
          Please fill in the details below
        </p>

        <FilledInput
          type="text"
          name="driverName"
          title="Driver's Name"
          placeholder="Your name"
          value={formik.values.driverName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.driverName && formik.errors.driverName}
        />

        <FilledInput
          type="tel"
          name="phoneNumber"
          title="Driver's Phone Number"
          placeholder="Your phone number"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phoneNumber && formik.errors.phoneNumber}
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

        <Dropdown
          name="vehicle"
          title="What kind of vehicle?"
          options={vehicleOptions}
          value={formik.values.vehicle}
          onChange={formik.handleChange}
          customStyle={
            formik.touched.vehicle && formik.errors.vehicle
              ? "border-red-500"
              : ""
          }
        />

        <Dropdown
          name="license"
          title="Do you have a valid license?"
          options={[
            { value: "yes", title: "Yes" },
            { value: "no", title: "No" },
          ]}
          value={formik.values.license}
          onChange={formik.handleChange}
          customStyle={
            formik.touched.license && formik.errors.license
              ? "border-red-500"
              : ""
          }
        />

        <Dropdown
          name="insurance"
          title="Valid SGI Vehicle Insurance?"
          options={[
            { value: "yes", title: "Yes" },
            { value: "no", title: "No" },
          ]}
          value={formik.values.insurance}
          onChange={formik.handleChange}
          customStyle={
            formik.touched.insurance && formik.errors.insurance
              ? "border-red-500"
              : ""
          }
        />

        <Dropdown
          name="availability"
          title="Availability"
          options={availabilityOptions}
          value={formik.values.availability}
          onChange={formik.handleChange}
          customStyle={
            formik.touched.availability && formik.errors.availability
              ? "border-red-500"
              : ""
          }
        />

        <Dropdown
          name="timeAvailable"
          title="Time Available"
          options={timeOptions}
          value={formik.values.timeAvailable}
          onChange={formik.handleChange}
          customStyle={
            formik.touched.timeAvailable && formik.errors.timeAvailable
              ? "border-red-500"
              : ""
          }
        />

        <Dropdown
          name="deliveryZone"
          title="Preferred zone for delivery"
          options={deliveryZoneOptions}
          value={formik.values.deliveryZone}
          onChange={formik.handleChange}
          customStyle={
            formik.touched.deliveryZone && formik.errors.deliveryZone
              ? "border-red-500"
              : ""
          }
        />

        <div className="flex justify-center mt-6">
          <PrimaryButton type="submit">SUBMIT YOUR REQUEST</PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default DriverRequestForm;
