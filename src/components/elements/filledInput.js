import PropTypes from "prop-types";

function FilledInput({
  type,
  name,
  onChange,
  customStyle,
  value,
  placeholder,
  autoComplete,
  error,
  disabled,
  title,
  onBlur,
}) {
  return (
    <div className="font-serif w-full mb-4">
      <label className="text-[#344054] text-[10px] lg:text-[12px] mb-1 block">
        {title}
      </label>
      <input
        className={`${
          error ? "border-rose-300" : "border-[#D0D5DDC2] focus:border-primary"
        } border-solid border-[0.4px] py-2 px-4 w-full h-[40px] text-[#616161] focus:outline-none focus:border-primary focus:text-[#444444] rounded-[6px] shadow-sm bg-[#F2F2F2]
            focus:border disabled:opacity-50 ${customStyle}`}
        type={type}
        disabled={disabled}
        name={name}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {error && <div className="text-rose-300 text-[10px] mt-1">{error}</div>}
    </div>
  );
}

export default FilledInput;

FilledInput.propTypes = {
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
