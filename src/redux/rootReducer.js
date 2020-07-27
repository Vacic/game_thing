import { combineReducers } from 'redux';
import locationEnemiesReducer from './locationEnemies/locationEnemiesReducer';
import playerReducer from './player/playerReducer';
import gameDataReducer from './gameData/gameDataReducer';

const rootReducer = combineReducers({
    locationEnemies: locationEnemiesReducer,
    player: playerReducer,
    gameData: gameDataReducer
});

export default rootReducer;