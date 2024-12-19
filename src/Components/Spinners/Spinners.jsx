import { PropagateLoader, RingLoader } from "react-spinners";
import ".//Spinners.css";
function Spinners() {
  return (
    <>
      <div className="overlay-page"></div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "30vh",
          border: "10px solid #00386d",
          borderRadius: "20px",
          maxWidth: "30vb",
          margin: "auto auto",
          marginTop: "15%",
        }}
      >
        <div
          style={{
            marginRight: "-10px",
            marginBottom: "40px",
            zIndex: "10000",
          }}
        >
          <RingLoader color="#00386d" size={80} />
        </div>
        <div style={{ marginLeft: "-10px", zIndex: "10000" }}>
          <PropagateLoader color="#00386d" size={20} />
        </div>
      </div>
    </>
  );
}

export default Spinners;
