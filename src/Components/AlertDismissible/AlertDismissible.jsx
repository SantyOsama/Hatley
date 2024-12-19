import Alert from "react-bootstrap/Alert";

function LinksExample({ label }) {
  return (
    <>
      {["warning"].map((variant) => (
        <Alert
          key={variant}
          variant={variant}
          style={{
            color: "white",
            fontSize: "25px",
            fontWeight: "bold",
            backgroundColor: "#479eef",
          }}
        >
          {label}:{/* <FontAwesomeIcon icon="fa-solid fa-arrow-right" /> */}
          {"      "} Where you want to order {label}
        </Alert>
      ))}
    </>
  );
}

export default LinksExample;
