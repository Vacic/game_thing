import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import './css/main.css';
import GameContainer from './components/GameContainer';

function App() {
	return (
		<Provider store={store}>
			<GameContainer />
		</Provider>
	)
}

export default App;