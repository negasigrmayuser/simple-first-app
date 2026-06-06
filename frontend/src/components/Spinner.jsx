import React from "react";
import '../stryles/Spinner.css'
const Spinner = () => {
  return (
    <div className="loadingSpinnerContainer">
      <div className="spinnerCard">
        <div className="loadingSpinner"></div>

        <h2>🎯 GoalSetter</h2>

        <p>Loading your goals...</p>
      </div>
    </div>
  );
};

export default Spinner;