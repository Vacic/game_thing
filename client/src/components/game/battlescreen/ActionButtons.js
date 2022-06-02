import React from "react";
import { connect } from "react-redux";

const ActionButtons = ({ stopCombat, initCombat, currentLocation }) => (
  <div className="action-buttons">
    <button className="btn neutral" onClick={() => initCombat(currentLocation)}>
      Start Fight
    </button>
    <button className="btn danger" onClick={() => stopCombat()}>
      Run Away
    </button>
  </div>
);

const mapStateToProps = (state) => ({
  currentLocation: state.gameData.currentLocation,
});

export default connect(mapStateToProps)(ActionButtons);
