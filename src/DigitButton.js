import { actions } from "./App";
function DigitButton(props) {
  const digit = props.digit;
  return (
    <button
      onClick={() =>
        props.dispatch({ type: actions.add_digit, payload: { digit } })
      }
    >
      {digit}
    </button>
  );
}

export default DigitButton;
