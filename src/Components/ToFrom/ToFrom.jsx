import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ToFrom.css";
function ToFrom({ to, from }) {
  return (
    <>
      <p className="toFrom">
        <span>{to}</span>
        <FontAwesomeIcon
          icon="fa-solid fa-arrow-right"
          className="icon me-2 ms-2"
        />
        <span>{from}</span>
      </p>
    </>
  );
}
export default ToFrom;
