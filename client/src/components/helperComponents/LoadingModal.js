import React from "react";
import { connect } from "react-redux";
import Spinner from "./Spinner";

const LoadingModal = ({ isCookieChecked }) => {
  return (
    !isCookieChecked && (
      <div className="modal-container">
        <div className="loading-modal">
          <Spinner />
          <p>Loading Your Progress</p>
        </div>
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  isCookieChecked: state.gameData.isCookieChecked,
});

export default connect(mapStateToProps)(LoadingModal);
