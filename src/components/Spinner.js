import React from "react";

const Spinner = (props) => {
  return (
    <div>
      {props.load && (
        <div className="position-absolute" style={{ top: "30%", left: "50%" }}>
          <div className="spinner-border text-primary" />
        </div>
      )}
    </div>
  );
};

export default Spinner;
