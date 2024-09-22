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

    // If the value already exists, remove it; if not, add it
    if (value.includes(selectedValue)) {
      newValue = value.filter((val) => val !== selectedValue);
    } else {
      newValue = [...value, selectedValue];
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
        {" "}
        {/* Grid layout for 3 columns */}
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={value.includes(option.value)}
              onChange={handleOptionChange}
              className="form-checkbox"
            />
            <span className="text-[12px]">{option.title}</span>
          </label>
        ))}
      </div>
      {error && <div className="text-rose-300 text-[10px] mt-1">{error}</div>}
    </div>
  );
}

export default MultipleCheckboxGrid;
