// // import { useState } from "react";
// // import ButtonGroup from "react-bootstrap/ButtonGroup";
// // import ToggleButton from "react-bootstrap/ToggleButton";

// // function ToggleButtonExample() {
// //   const [radioValue, setRadioValue] = useState("1");

// //   const radios = [
// //     {
// //       name: "Cash on delivery",
// //       value: "1",
// //       disabled: false,
// //       style: {
// //         marginRight: "50px",
// //         border: "1px solid #000",
// //         borderRadius: "10px",
// //       },
// //     },
// //     {
// //       name: "Payment now ",
// //       value: "2",
// //       disabled: true,
// //       style: {
// //         backgroundColor: "white",
// //         color: "#000",
// //         cursor: "disabled-button", // Changed from "disable" to "not-allowed"
// //       },
// //     },
// //   ];

// //   return (
// //     <>
// //       <ButtonGroup>
// //         {radios.map((radio, idx) => (
// //           <ToggleButton
// //             key={idx}
// //             id={`radio-${idx}`}
// //             type="radio"
// //             variant={idx % 2 ? "outline-success" : "outline-danger"}
// //             name="radio"
// //             value={radio.value}
// //             checked={radioValue === radio.value}
// //             onChange={(e) => setRadioValue(e.currentTarget.value)}
// //             disabled={radio.disabled}
// //             style={{
// //               ...radio.style,
// //             }}
// //           >
// //             {radio.name}
// //           </ToggleButton>
// //         ))}
// //       </ButtonGroup>
// //     </>
// //   );
// // }

// // export default ToggleButtonExample;
// import Button from "react-bootstrap/Button";

// function ActiveExample() {
//   return (
//     <>
//       <Button variant="primary" size="lg" active>
//         Primary button
//       </Button>
//       <Button variant="secondary" size="lg" active>
//         Button
//       </Button>
//     </>
//   );
// }

// export default ActiveExample;
