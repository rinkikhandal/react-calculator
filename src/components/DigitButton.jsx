import { Actions } from "../App";
import PropTypes from "prop-types";

const DigitButton = ({ digit, dispatch }) => {
  const handleDigit = () => {
    dispatch({ type: Actions.ADD_DIGIT, payload: { digit } });
  };

  return (
    <button
      className="col-span-1 outline-none text-white text-center text-3xl border-[0.5px] border-white px-2 py-5"
      onClick={handleDigit}
    >
      {digit}
    </button>
  );
};

DigitButton.propTypes = {
  digit: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default DigitButton;
