import PropTypes from "prop-types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers";

function TimeInput({
  name,
  onChange,
  placeholder,
  error,
  disabled,
  title,
  onBlur,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="font-serif w-full mb-4">
        <label className="text-[#344054] text-[10px] lg:text-[12px] mb-1 block">
          {title}
        </label>
        <TimePicker
          sx={{
            width: "100%",
            backgroundColor: "#F2F2F2",
            height: "40px",
            p: 0,
            borderRadius: "6px",
            border: "none",
            "& input": {
              border: error ? "1px solid #ff0000" : "none",
              height: "40px",
              py: 0,
              borderRadius: "6px",
            },
          }}
          disabled={disabled}
          name={name}
          // value={value}
          onChange={(v) =>
            onChange(`${v.hour() < 10 && "0"}${v.hour()}:${v.minute()}`)
          }
          onBlur={onBlur}
          placeholder={placeholder}
        />

        {error && <div className="text-rose-300 text-[10px] mt-1">{error}</div>}
      </div>
    </LocalizationProvider>
  );
}

export default TimeInput;

TimeInput.propTypes = {
  type: PropTypes.string.isRequired, // The type of input (text, email, etc.)
  name: PropTypes.string.isRequired, // The name of the input field
  onChange: PropTypes.func, // Function to handle input change
  customStyle: PropTypes.string, // Any additional custom styles for the input
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // The value of the input
  placeholder: PropTypes.string, // Placeholder text for the input
  autoComplete: PropTypes.string, // Autocomplete attribute for the input
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // Error message or boolean indicating an error
  disabled: PropTypes.bool, // Boolean indicating if the input is disabled
  title: PropTypes.string.isRequired, // Title/Label of the input field
  onBlur: PropTypes.func, // Function to handle input blur event
};
