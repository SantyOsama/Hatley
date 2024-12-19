import React, { useState } from "react";
import "./Question.css"; // Import the CSS file

function Question(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="ques-container">
      <div className="accordion accordion-flush">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${isOpen ? "" : "collapsed"}`}
              type="button"
              onClick={toggleAccordion}
              aria-expanded={isOpen}
            >
              {props.title}
            </button>
          </h2>
          <div
            className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
          >
            <div className="accordion-body">{props.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;
