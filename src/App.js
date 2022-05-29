import "./App.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import { useReducer } from "react";
export const actions = {
  add_digit: "add-digit",
  choose_operation: "choose_operation",
  clear: "clear",
  delete_digit: "delete_digit",
  evaluate: "evaluate",
};

function reducer(
  [currentOperand, previousOperand, operation],
  { type, payload }
) {
  switch (type) {
    case actions.add_digit:
      switch (payload.digit) {
        case "0":
          if (currentOperand === "") {
            return [currentOperand, previousOperand, operation];
          }
          break;
        case ".":
          if (currentOperand === "" || currentOperand.includes(".")) {
            return [currentOperand, previousOperand, operation];
          }
          break;
        default:
          break;
      }
      currentOperand = currentOperand + payload.digit;
      return [currentOperand, previousOperand, operation];

    case actions.choose_operation:
      if (currentOperand === "" && previousOperand === "") {
        return [currentOperand, previousOperand, operation];
      } else if (currentOperand === "" && previousOperand !== "") {
        operation = payload.operation;
      } else if (previousOperand === "" && currentOperand !== "") {
        previousOperand = currentOperand;
        currentOperand = "";
        operation = payload.operation;
      } else {
        previousOperand = evaluate(previousOperand, currentOperand, operation);
        currentOperand = "";
        operation = payload.operation;
      }
      return [currentOperand, previousOperand, operation];

    case actions.clear:
      currentOperand = "";
      previousOperand = "";
      operation = "";
      return [currentOperand, previousOperand, operation];

    case actions.delete_digit:
      if (currentOperand === "" && previousOperand === "") {
        return [currentOperand, previousOperand, operation];
      } else if (currentOperand === "" && previousOperand !== "") {
        currentOperand = previousOperand;
        previousOperand = "";
        operation = "";
      } else {
        currentOperand = currentOperand.slice(0, -1);
      }
      return [currentOperand, previousOperand, operation];

    case actions.evaluate:
      if (currentOperand !== "" && previousOperand !== "" && operation !== "") {
        currentOperand = evaluate(previousOperand, currentOperand, operation);
        previousOperand = "";
        operation = "";
      }
      return [currentOperand, previousOperand, operation];

    default:
      break;
  }
}

function evaluate(previousOperand, currentOperand, operation) {
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  let calculate = "";
  if (isNaN(previous) || isNaN(current)) {
    return "";
  }
  switch (operation) {
    case "÷":
      calculate = previous / current;
      break;
    case "×":
      calculate = previous * current;
      break;
    case "+":
      calculate = previous + current;
      break;
    case "-":
      calculate = previous - current;
      break;
    default:
      break;
  }
  return calculate.toString();
}

function formatOperand(operand) {
  const numberFormat = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  });
  if (operand === "") {
    return "";
  }
  const [integer, decimal] = operand.split(".");
  if (operand.slice(-1) === ".") {
    return `${numberFormat.format(integer)}.`;
  }
  if (decimal === "" || decimal === null || decimal === undefined) {
    return numberFormat.format(integer);
  }
  return `${numberFormat.format(integer)}.${decimal}`;
}

function App() {
  const [[currentOperand, previousOperand, operation], dispatch] = useReducer(
    reducer,
    ["", "", ""]
  );
  return (
    <div className="calc-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>

      <button
        className="span-two"
        onClick={() => dispatch({ type: actions.clear })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: actions.delete_digit })}>
        DEL
      </button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="×" dispatch={dispatch} />
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
        className="span-two"
        onClick={() => dispatch({ type: actions.evaluate })}
      >
        =
      </button>
    </div>
  );
}

export default App;
