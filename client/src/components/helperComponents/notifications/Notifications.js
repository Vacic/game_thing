import React from "react";
import { connect } from "react-redux";
import Notification from "./Notification";

const Notifications = ({ notifications }) =>
  notifications.length > 0 && (
    <div className={"notifications"}>
      {notifications.map((notif, i) => (
        <Notification key={i} notification={notif} />
      ))}
    </div>
  );

const mapStateToProps = (state) => ({
  notifications: state.notifications.notifications,
});

export default connect(mapStateToProps)(Notifications);
