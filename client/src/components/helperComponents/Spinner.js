import React from "react";
import loadingImg from "../../img/loading.png";

const Spinner = () => (
  <div className="spinner-img">
    <div className="spinner-placeholder"></div>
    <img className="spinner" src={loadingImg} alt="" />
  </div>
);

export default Spinner;
