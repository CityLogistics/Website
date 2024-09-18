function Dropdown({
  options,
  customStyle,
  value,
  onChange,
  name,
  title,
  error,
}) {
  return (
    <div className="relative mb-4">
      <span className="text-[#344054] text-[10px] lg:text-[12px] mb-1 block">
        {title}
      </span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`appearance-none border-solid border-[0.4px] border-[#D0D5DDC2] py-2 px-4 w-full h-[40px] text-[#616161] focus:outline-none focus:border-primary focus:text-[#444444] rounded-[6px] shadow-sm bg-[#F2F2F2]
            focus:border disabled:opacity-50 ${customStyle} 
     leading-tight`}
      >
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-2 pt-6 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      {error && <div className="text-rose-300 text-[10px] mt-1">{error}</div>}
    </div>
  );
}

export default Dropdown;
