import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./redux/store";
import "./css/main.min.css";
import GameContainer from "./components/game/GameContainer";
import RegistrationForm from "./components/register_login/RegistrationForm";
import Header from "./components/game/header/Header";
import LoginForm from "./components/register_login/LoginForm";
import Profile from "./components/profile/Profile";

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route
          exact
          path={"/"}
          render={() => (
            <React.Fragment>
              <Header />
              <GameContainer />
            </React.Fragment>
          )}
        />
        <Route exact path="/register" component={RegistrationForm} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
