/* eslint-disable react/no-unescaped-entities */
import { useFormik } from "formik";
import * as yup from "yup";
import FilledInput from "../elements/filledInput";
import Dropdown from "../elements/dropdown";
import PrimaryButton from "../elements/primaryButton";
import Loader from "../Loader";
import { useState } from "react";

const DriverRequestForm = () => {
  // Validation schema
  const validationSchema = yup.object({
    firstName: yup.string().required("Driver's first name is required"),
    lastName: yup.string().required("Driver's last name is required"),
    phoneNumber: yup.string().required("Phone number is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    ownVehicle: yup.string().required("Vehicle ownership status is required"),
    vehicleType: yup.string().required("Vehicle type is required"),
    hasValidLicense: yup.string().required("Valid license is required"),
    hasValidVehicleInsurance: yup
      .string()
      .required("Insurance status is required"),
    availabiltyDays: yup.string().required("Availability is required"),
    availabiltyTime: yup.string().required("Time available is required"),
    preferredTimeZone: yup.string().required("Delivery zone is required"),
  });

  const [loading, setLoading] = useState(false);

  // Formik hook
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      image: "",
      ownVehicle: true,
      vehicleType: "",
      hasValidLicense: true,
      hasValidVehicleInsurance: true,
      availabiltyDays: "",
      availabiltyTime: "",
      preferredTimeZone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const { status, error, data } = await instance.post("/drivers", values);
        setLoading(false);
        if (status == 201 && data) {
          console.info({ data });
          router.push(data.paymentUrl);
        } else toast.error(parseError(error));
      } catch (error) {
        setLoading(false);

        toast.error(parseError(error));
      }
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
          name="firstName"
          title="Driver's Name"
          placeholder="Your first name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && formik.errors.firstName}
        />

        <FilledInput
          type="text"
          name="lastName"
          title="Driver's Name"
          placeholder="Your last name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && formik.errors.lastName}
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
          name="ownVehicle"
          title="Do you own a vehicle?"
          options={vehicleOptions}
          value={formik.values.ownVehicle}
          onChange={formik.handleChange}
          customStyle={
            formik.touched.ownVehicle && formik.errors.ownVehicle
              ? "border-red-500"
              : ""
          }
          error={formik.touched.ownVehicle && formik.errors.ownVehicle}
        />
        <Dropdown
          name="vehicleType"
          title="What kind of vehicle?"
          options={vehicleOptions}
          value={formik.values.vehicleType}
          onChange={formik.handleChange}
          customStyle={
            formik.touched.vehicleType && formik.errors.vehicleType
              ? "border-red-500"
              : ""
          }
          error={formik.touched.vehicleType && formik.errors.vehicleType}
        />

        <Dropdown
          name="hasValidLicense"
          title="Do you have a valid license?"
          options={[
            { value: "yes", title: "Yes" },
            { value: "no", title: "No" },
          ]}
          value={formik.values.hasValidLicense}
          onChange={formik.handleChange}
          customStyle={
            formik.touched.hasValidLicense && formik.errors.hasValidLicense
              ? "border-red-500"
              : ""
          }
          error={
            formik.touched.hasValidLicense && formik.errors.hasValidLicense
          }
        />

        <Dropdown
          name="hasValidVehicleInsurance"
          title="Valid SGI Vehicle Insurance?"
          options={[
            { value: "yes", title: "Yes" },
            { value: "no", title: "No" },
          ]}
          value={formik.values.hasValidVehicleInsurance}
          onChange={formik.handleChange}
          customStyle={
            formik.touched.hasValidVehicleInsurance &&
            formik.errors.hasValidVehicleInsurance
              ? "border-red-500"
              : ""
          }
          error={
            formik.touched.hasValidVehicleInsurance &&
            formik.errors.hasValidVehicleInsurance
          }
        />

        <Dropdown
          name="availabiltyDays"
          title="Availability"
          options={availabilityOptions}
          value={formik.values.availabiltyDays}
          onChange={formik.handleChange}
          customStyle={
            formik.touched.availabiltyDays && formik.errors.availabiltyDays
              ? "border-red-500"
              : ""
          }
          error={
            formik.touched.availabiltyDays && formik.errors.availabiltyDays
          }
        />

        <Dropdown
          name="availabiltyTime"
          title="Time Available"
          options={timeOptions}
          value={formik.values.availabiltyTime}
          onChange={formik.handleChange}
          customStyle={
            formik.touched.availabiltyTime && formik.errors.availabiltyTime
              ? "border-red-500"
              : ""
          }
          error={
            formik.touched.availabiltyTime && formik.errors.availabiltyTime
          }
        />

        <Dropdown
          name="preferredTimeZone"
          title="Preferred zone for delivery"
          options={deliveryZoneOptions}
          value={formik.values.preferredTimeZone}
          onChange={formik.handleChange}
          customStyle={
            formik.touched.preferredTimeZone && formik.errors.preferredTimeZone
              ? "border-red-500"
              : ""
          }
          error={
            formik.touched.preferredTimeZone && formik.errors.preferredTimeZone
          }
        />

        <div className="flex justify-center mt-6">
          <PrimaryButton type="submit">
            {loading ? (
              <Loader dotClassess="bg-white" />
            ) : (
              "SUBMIT YOUR REQUEST"
            )}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default DriverRequestForm;
