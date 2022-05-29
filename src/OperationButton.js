import { actions } from "./App";
function OperationButton(props) {
  const operation = props.operation;
  return (
    <button
      onClick={() =>
        props.dispatch({
          type: actions.choose_operation,
          payload: { operation },
        })
      }
    >
      {operation}
    </button>
  );
}

export default OperationButton;
