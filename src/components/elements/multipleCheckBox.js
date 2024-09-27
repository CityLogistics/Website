function MultipleCheckboxGrid({
  options,
  value = [],
  onChange,
  name,
  title,
  error,
}) {
  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    let newValue;

    // Handle 'ALL' checkbox
    if (selectedValue === "ALL") {
      if (value.length === options.length) {
        newValue = []; // If all are selected, deselect all
      } else {
        newValue = options.map((option) => option.value); // Select all options
      }
    } else {
      // Handle individual checkbox selection
      if (value.includes(selectedValue)) {
        newValue = value.filter((val) => val !== selectedValue);
      } else {
        newValue = [...value, selectedValue];
      }
    }

    onChange({
      target: {
        name,
        value: newValue, // Send the updated array of selected values
      },
    });
  };

  return (
    <div className="relative mb-6">
      <label className="text-[#344054] text-[10px] lg:text-[12px] mb-1 block">
        {title}
      </label>
      <div className="grid grid-cols-3 gap-4">
        {/* Individual Checkboxes */}
        {options.map((option) => (
          <label key={option.value} className="flex items-start space-x-2">
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={value.includes(option.value)}
              onChange={handleOptionChange}
              className="form-checkbox mt-1"
            />
            <span className="text-[12px]">{option.title}</span>
          </label>
        ))}
        {/* "ALL" Checkbox */}
        <label className="flex items-start space-x-2">
          <input
            type="checkbox"
            name={name}
            value="ALL"
            checked={value.length === options.length}
            onChange={handleOptionChange}
            className="form-checkbox mt-1"
          />
          <span className="text-[12px]">All</span>
        </label>
      </div>
      {error && <div className="text-rose-300 text-[10px] mt-1">{error}</div>}
    </div>
  );
}

export default MultipleCheckboxGrid;
