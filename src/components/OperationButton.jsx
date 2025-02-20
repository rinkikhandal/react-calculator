import { Actions } from "../App";
import PropTypes from "prop-types";
const OperationButton = ({ operation, dispatch }) => {
  return (
    <button
      className="col-span-1 outline-none text-white text-center text-3xl border-[0.5px] border-white px-2 py-5"
      onClick={() => {
        dispatch({ type: Actions.CHOOSE_OPERATION, payload: { operation } });
      }}
    >
      {operation}
    </button>
  );
};

OperationButton.propTypes = {
  operation: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default OperationButton;
