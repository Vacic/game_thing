import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { removeNotification } from "../../../redux";

const Notification = ({
  notification: { msg, classType, img },
  removeNotification,
}) => {
  const [isNotifHidden, toggleNotif] = useState(true);

  useEffect(() => {
    setTimeout(() => toggleNotif(false), 10);
    const toggleTimeout = setTimeout(() => toggleNotif(true), 2000);
    setTimeout(() => removeNotification(), 2400); // toggleNotif Timeout + Animation Time (which can be shorter if you bother to time it to when the notif visually disappears from the page)
    return () => clearTimeout(toggleTimeout);
  }, [removeNotification]);

  return (
    <div
      className={`notification ${classType} ${isNotifHidden ? "hide" : ""} ${
        !img ? "center" : ""
      }`}
    >
      {<p className="notification-text">{msg}</p>}
      {img && <img className="notification-img" src={img} alt="" />}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeNotification: () => dispatch(removeNotification()),
});

export default connect(null, mapDispatchToProps)(Notification);
