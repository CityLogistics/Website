import { useCloudinary } from "@/utils";
import PropTypes from "prop-types";
import Loader from "../Loader";

function ImageInput({
  type,
  name,
  onChange,
  customStyle,
  value,
  placeholder,
  autoComplete,
  error,
  title,
  onBlur,
}) {
  const { loading: widgetLoading, launchWidget } = useCloudinary(onChange);
  console.info({ widgetLoading });

  return (
    <div className="font-serif w-full mb-4">
      <label className="text-[#344054] text-[10px] lg:text-[12px] mb-1 block">
        {title}
      </label>

      <div className="relative">
        <div
          className="absolute  left-0 right-0 bottom-0 top-0 z-50"
          onClick={launchWidget}
        >
          {widgetLoading && (
            <div className="flex justify-end">
              {" "}
              <Loader />
            </div>
          )}
        </div>
        <input
          className={`${
            error
              ? "border-rose-300"
              : "border-[#D0D5DDC2] focus:border-primary"
          } border-solid border-[0.4px] py-2 px-4 w-full h-[40px] text-[#616161] disabled:text-[#616161] disabled:opacity-100 disabled:bg-[#F2F2F2] focus:outline-none focus:border-primary focus:text-[#444444] rounded-[6px] shadow-sm bg-[#F2F2F2]
            focus:border  ${customStyle}`}
          type={type}
          disabled
          name={name}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />
      </div>

      {error && <div className="text-rose-300 text-[10px] mt-1">{error}</div>}
    </div>
  );
}

export default ImageInput;

ImageInput.propTypes = {
  type: PropTypes.string.isRequired, // The type of input (text, email, etc.)
  name: PropTypes.string.isRequired, // The name of the input field
  onChange: PropTypes.func.isRequired, // Function to handle input change
  customStyle: PropTypes.string, // Any additional custom styles for the input
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // The value of the input
  placeholder: PropTypes.string, // Placeholder text for the input
  autoComplete: PropTypes.string, // Autocomplete attribute for the input
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // Error message or boolean indicating an error
  disabled: PropTypes.bool, // Boolean indicating if the input is disabled
  title: PropTypes.string.isRequired, // Title/Label of the input field
  onBlur: PropTypes.func, // Function to handle input blur event
};
