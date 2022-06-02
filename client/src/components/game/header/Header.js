import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LogIn from "./LogIn";
import UserMenu from "./UserMenu";

const Header = ({ loggedIn, username }) => {
  const [isLoginHidden, toggleLogin] = useState(true);
  const [isUserMenuHidden, toggleMenu] = useState(true);

  return (
    <div className="header">
      {!loggedIn && (
        <p className="header-text">
          To save your progress to the cloud please login or register
        </p>
      )}
      {!loggedIn ? (
        <div className="header-links">
          <div
            className="login-button header-button"
            onClick={() =>
              isLoginHidden
                ? toggleLogin(!isLoginHidden)
                : toggleLogin(!isLoginHidden)
            }
          >
            Log In
          </div>
          <Link className="header-button" to="/register">
            <div>Register</div>
          </Link>
          <LogIn isLoginHidden={isLoginHidden} toggleLogin={toggleLogin} />
        </div>
      ) : (
        <div className="user-nav">
          <p
            className="header-button"
            onClick={() => toggleMenu(!isUserMenuHidden)}
          >
            {username}
          </p>
          <UserMenu
            isUserMenuHidden={isUserMenuHidden}
            toggleMenu={toggleMenu}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.gameData.loggedIn,
  username: state.player.user.username,
});

export default connect(mapStateToProps)(Header);
