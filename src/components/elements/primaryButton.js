import PropTypes from "prop-types";

function PrimaryButton({ children, customStyle, handleClick, type, disabled }) {
  return (
    <button
      type={type ? type : "button"}
      onClick={handleClick}
      disabled={disabled}
      className={`font-serif flex items-center justify-center px-7 bg-primary disabled:opacity-20 h-[45px] md:h-[50px] min-w-[200px] md:min-w-[250px] text-lg md:text-xl text-white font-bold rounded-[49px] ${customStyle}`}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;

PrimaryButton.propTypes = {
  children: PropTypes.any.isRequired,
  customStyle: PropTypes.string,
  handleClick: PropTypes.func,
};
