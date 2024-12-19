import React from "react";
var lables = document.getElementsByTagName("label");
function Input(props) {
  const handleFocus = (event) => {
    for (var i = 0; i < lables.length; i++) {
      if (lables[i].htmlFor === event.target.id) {
        lables[i].classList.add("activeInput");
        break;
      }
    }
  };
  const handleBlur = (event) => {
    for (var i = 0; i < lables.length; i++) {
      if (lables[i].htmlFor === event.target.id && event.target.value === "") {
        console.log(event.target.value);
        lables[i].classList.remove("activeInput");
        break;
      }
    }
  };
  return (
    <>
      {/* type     id      content */}
      <div className="field">
        <label htmlFor={props.id}>{props.content}</label>
        <input
          type={props.type}
          autoComplete="off"
          required
          id={props.id}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </>
  );
}
export default Input;
