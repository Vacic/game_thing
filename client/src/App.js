import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './redux/store';
import './css/main.css';
import GameContainer from './components/GameContainer';
import RegistrationForm from './components/register_login/RegistrationForm';
import Header from './components/header/Header';
import LoginForm from './components/register_login/LoginForm';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path={"/"} render={() => (
						<React.Fragment>
							<Header />
							<GameContainer />
						</React.Fragment>
					)} />
					<Route exact path="/register" component={RegistrationForm} />
					<Route exact path="/login" component={LoginForm} />
				</Switch>
			</Router>
		</Provider>
	)
}

export default App;