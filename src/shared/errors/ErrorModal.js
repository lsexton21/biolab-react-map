import WarningModal from "../UI/WarningModal";
import Button from "../form-elements/Button";

const ErrorModal = (props) => {
  return (
    <WarningModal
      onClick={props.onClick}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClick}>Okay</Button>}
    >
      <p>{props.error}</p>
    </WarningModal>
  );
};

export default ErrorModal;
