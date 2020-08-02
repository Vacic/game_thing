import { combineReducers } from 'redux';
import locationEnemiesReducer from './locationEnemies/locationEnemiesReducer';
import playerReducer from './player/playerReducer';
import gameDataReducer from './gameData/gameDataReducer';
import itemListReducer from './itemList/itemListReducer';
import inventoryReducer from './inventory/inventoryReducer';

const rootReducer = combineReducers({
    locationEnemies: locationEnemiesReducer,
    player: playerReducer,
    gameData: gameDataReducer,
    items: itemListReducer,
    inventory: inventoryReducer
});

export default rootReducer;