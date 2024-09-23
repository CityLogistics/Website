/* eslint-disable react/no-unescaped-entities */
import { useFormik } from "formik";
import * as yup from "yup";
import FilledInput from "../elements/filledInput";
import Dropdown from "../elements/dropdown";
import PrimaryButton from "../elements/primaryButton";
import Loader from "../Loader";
import { useState } from "react";
import { toast } from "sonner";
import { parseError, formatPhoneNumber } from "@/utils";
import { instance } from "@/apis";
import { useRouter } from "next/navigation";
import PhoneInput from "../elements/phoneInput";
import { WidgetLoader } from "react-cloudinary-upload-widget";
import ImageInput from "../elements/ImageInput";
import MultipleCheckboxGrid from "../elements/multipleCheckBox";
import ImageComponent from "../ImageComponent";

const DriverRequestForm = () => {
  // Validation schema
  const validationSchema = yup.object({
    firstName: yup.string().required("Driver's first name is required"),
    lastName: yup.string().required("Driver's last name is required"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .test("len", "Phone number is invalid", (val) => val.length == 10),
    email: yup.string().email("Invalid email").required("Email is required"),
    ownVehicle: yup.string().required("Vehicle ownership status is required"),
    vehicleType: yup.string().when("ownVehicle", {
      is: (value) => value === "true",
      then: (schema) => schema.required("Vehicle type is required"),
      otherwise: (schema) => schema,
    }),

    hasValidLicense: yup.string().required("Valid license is required"),
    hasValidVehicleInsurance: yup
      .string()
      .required("Insurance status is required"),
    availabiltyDays: yup
      .array()
      .min(1, "Please select at least one day of availability")
      .required("Availability is required"),
    availabiltyTime: yup
      .array()
      .min(1, "Please select at least one day of availability")
      .required("Time available is required"),
    preferredTimeZone: yup.string().required("Delivery zone is required"),
    image: yup.string().required("Image is required"),
  });

  const [loading, setLoading] = useState(false);
  var isTrueSet = (v) => v === "true";
  const router = useRouter();
  // Formik hook
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      image: "",
      ownVehicle: "true",
      vehicleType: "",
      hasValidLicense: "true",
      hasValidVehicleInsurance: "true",
      availabiltyDays: [],
      availabiltyTime: [],
      preferredTimeZone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const {
        ownVehicle,
        hasValidLicense,
        hasValidVehicleInsurance,
        vehicleType,
        availabiltyDays,
        availabiltyTime,
        phoneNumber,
        ...others
      } = values;

      const payLoad = {
        ...others,
        ownVehicle: isTrueSet(ownVehicle),
        hasValidLicense: isTrueSet(hasValidLicense),
        hasValidVehicleInsurance: isTrueSet(hasValidVehicleInsurance),
        availabiltyDays: availabiltyDays,
        availabiltyTime: availabiltyTime,
        phoneNumber: formatPhoneNumber(phoneNumber),
      };

      if (isTrueSet(ownVehicle)) payLoad["vehicleType"] = vehicleType;

      try {
        const { status, error, data } = await instance.post(
          "/drivers",
          payLoad
        );
        setLoading(false);
        if (status == 201 && data) {
          formik.resetForm();
          toast.success("Driver request saved");
          setTimeout(() => router.push("/"), 2000);
        } else toast.error(parseError(error));
      } catch (error) {
        setLoading(false);

        toast.error(parseError(error));
      }
    },
  });

  const boolOptions = [
    { value: "true", title: "Yes" },
    { value: "false", title: "No" },
  ];

  const vehicleOptions = [
    { value: "", title: "Select vehicle" },
    { value: "SALON", title: "Sedan/Salon" },
    { value: "FIVE_SEATER_SUV", title: "SUV" },
    { value: "TRUCK", title: "Truck" },
  ];

  const availabilityOptions = [
    { value: "MONDAY", title: "Mondays" },
    { value: "TUESDAY", title: "Tuesdays" },
    { value: "WEDNESDAY", title: "Wednesdays" },
    { value: "THURSDAY", title: "Thursdays" },
    { value: "FRIDAY", title: "Fridays" },
    { value: "SATURDAY", title: "Saturday" },
    { value: "SUNDAY", title: "Sunday" },
  ];

  const timeOptions = [
    { value: "MORNING", title: "Mornings (8 am to 12 noon)" },
    { value: "AFTERNOON", title: "Afternoons (12 pm to 5 pm)" },
    { value: "EVENING", title: "Evenings (5 pm to 9 pm)" },
    { value: "NIGHT", title: "Night (9 pm to 8 am)" },
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
      <WidgetLoader />
      <form onSubmit={formik.handleSubmit} className="font-serif w-full">
        <h2 className="text-lg font-bold mb-4">Driver's Pre-Qualification</h2>
        <p className="text-sm mb-6 text-gray-500">
          Please fill in the details below
        </p>

        <div className="mb-5">
          <ImageComponent
            onChange={(file) => formik.setFieldValue("image", file)}
            value={formik.values.image}
            error={formik.touched.image && formik.errors.image}
          />
        </div>

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

        <PhoneInput
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
          options={boolOptions}
          value={formik.values.ownVehicle}
          onChange={formik.handleChange}
          customStyle={
            formik.touched.ownVehicle && formik.errors.ownVehicle
              ? "border-red-500"
              : ""
          }
          error={formik.touched.ownVehicle && formik.errors.ownVehicle}
        />
        {formik.values.ownVehicle == "true" && (
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
        )}

        <Dropdown
          name="hasValidLicense"
          title="Do you have a valid license?"
          options={boolOptions}
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
          options={boolOptions}
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

        <MultipleCheckboxGrid
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

        <MultipleCheckboxGrid
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
          <PrimaryButton type="submit" customStyle="w-full">
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
