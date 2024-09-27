import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Custom date picker component

const DateTimePicker = ({ name, value, onChange, label, error }) => {
  return (
    <div className="w-full mb-4">
      <label className="block text-[#344054] text-[10px] lg:text-[12px] mb-1">
        {label}
      </label>
      <DatePicker
        selected={value}
        onChange={(date) =>
          onChange({
            target: {
              name,
              value: date,
            },
          })
        }
        showTimeSelect={name === "pickUpTime"}
        dateFormat="Pp"
        className={`border-solid border-[0.4px] py-2 px-4 w-full min-w-full text-left h-[40px] text-[#616161] focus:outline-none focus:border-primary focus:text-[#444444] rounded-[6px] shadow-sm bg-[#F2F2F2] ${
          error ? "border-rose-300" : "border-[#D0D5DDC2] focus:border-primary"
        }`}
      />
      {error && <div className="text-rose-300 text-[10px] mt-1">{error}</div>}
    </div>
  );
};
export default DateTimePicker;
