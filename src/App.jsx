import { useReducer } from "react";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";

export const Actions = {
  ADD_DIGIT: "add_digit",
  DELETE_DIGIT: "delete_digit",
  CHOOSE_OPERATION: "choose_operation",
  CLEAR: "clear",
  EVALUATE: "evaluate",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case Actions.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case Actions.CHOOSE_OPERATION:
      if (state.previousOperand == null && state.currentOperand == null)
        return state;
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        currentOperand: null,
        operation: payload.operation,
      };

    case Actions.CLEAR:
      return {
        previousOperand: null,
        currentOperand: null,
        operation: null,
      };

    case Actions.DELETE_DIGIT:
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }
      return { ...state, currentOperand: state.currentOperand.slice(0, -1) };

    case Actions.EVALUATE:
      if (state.previousOperand == null || state.currentOperand == null) {
        return state;
      }

      return {
        ...state,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
};

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

const formatOperand = (operand) => {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  console.log(integer, decimal);

  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
};

const evaluate = ({ previousOperand, operation, currentOperand }) => {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return "";
  // converting into string
  let computation = "";

  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }

  return `${computation}`;
};

const App = () => {
  // const [state, dispatch] = useReducer(reducer, {
  //   currentOperand: null,
  //   previousOperand: null,
  //   operation: null,
  // });

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    { currentOperand: null, previousOperand: null, operation: null }
  );

  return (
    <main className="min-h-[100vh] bg-black flex justify-center items-center">
      <article className="grid grid-cols-4 bg-neutral-700/40 w-[min(400px,70%)] rounded-md">
        <div className="output col-span-4 row-span-auto bg-neutral-700/40 flex flex-col justify-around items-end text-white p-2  w-full border-[0.5px] border-t-white border-x-white rounded-t-[inherit] min-h-[100px] break-words break-all">
          <div className="previous-operand text-sm ">
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className="current-operand text-3xl ">
            {formatOperand(currentOperand)}
          </div>
        </div>
        <button
          className="col-span-2 outline-none text-white text-center text-3xl border-[0.5px] border-white px-2 py-5"
          onClick={() => dispatch({ type: Actions.CLEAR })}
        >
          AC
        </button>
        <button
          className="col-span-1 outline-none text-white text-center text-3xl border-[0.5px] border--white px-2 py-5"
          onClick={() => dispatch({ type: Actions.DELETE_DIGIT })}
        >
          DEL
        </button>
        <OperationButton operation="÷" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />

        <OperationButton operation="*" dispatch={dispatch} />

        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />

        <OperationButton operation="+" dispatch={dispatch} />

        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />

        <OperationButton operation="-" dispatch={dispatch} />

        <DigitButton digit="." dispatch={dispatch} />

        <DigitButton digit="0" dispatch={dispatch} />

        <button
          className="col-span-2 outline-none text-white text-center text-3xl border-[0.5px] border-white px-2 py-5 rounded-br-[inherit]"
          onClick={() => dispatch({ type: Actions.EVALUATE })}
        >
          =
        </button>
      </article>
    </main>
  );
};

export default App;
