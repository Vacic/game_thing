import axios from 'axios';
import Cookies from 'universal-cookie';
import { SET_CURRENT_PLAYER_HP, SET_CURRENT_ENEMY_HP, SET_CURRENT_ENEMY_STATS, TOGGLE_LOADING, ENEMY_TAKES_DAMAGE, PLAYER_TAKES_DAMAGE, SET_CURRENT_LOCATION, SET_NOTIFICATION_MESSAGE, SET_NOTIFICATION_CLASS, LOGIN, SET_LOADING_ENEMY, COOKIE_CHECKED } from './gameDataTypes';
import { populatePlayer, updateInventory } from '../player/playerAction';
const cookies = new Cookies();

export const login = (email, password) => async dispatch => {
    dispatch(toggleLoading());
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({ email, password });
    try {
        await axios.post('/auth', body, config);
        await dispatch(populateGame());
        cookies.set('loggedIn', 'yup');
        dispatch(toggleLoading());
        return true;
    } catch (err) {
        cookies.remove('loggedIn');
        if (err.response && err.response.data.error) {
            dispatch(toggleLoading());
            return ({ error: err.response.data.error});
        } else { 
            console.log(err.response.statusText);
            dispatch(toggleLoading());
            return ({ error: 'Internal Server Error' });
        }
    }
}

export const logout = () => dispatch => {
    cookies.remove('loggedIn');
    dispatch(toggleLoading());
    let number = '';
    for(let i=0; i<8; i++) {
        number += Math.round(Math.random()*10);
    }
    localStorage.removeItem('progress');
    const username = `Guest_${number}`;

    dispatch(populatePlayer({
        weapon: 'Fists',
        hp: 80,
        dmg: 5, //5
        attSpd: 1, //1
        def: 0,
        eva: 1
    }, username, {}, []));
    dispatch(setCurrentPlayerHp(80));
    dispatch(setCurrentLocation('farm'));
    dispatch(updateInventory({}));
    dispatch(setLogin(false));
    dispatch(toggleLoading());
    dispatch(setLoadingEnemy());
    return true;
}

export const populateGame = () => async dispatch => {
    try {
        const { data } = await axios.get(`/users/progress`, { withCredentials: true });
        const { currentHp, currentLocation, inventory = {}, playerStats, equipment = {}, quickBarEquipment = ['', '', ''], user: { username } } = data;
        dispatch(populatePlayer(playerStats, username, equipment, quickBarEquipment));
        dispatch(setCurrentPlayerHp(currentHp));
        dispatch(setCurrentLocation(currentLocation));
        dispatch(updateInventory(inventory));
        dispatch(setLogin(true));
        dispatch(toggleLoading());
        return true;
    } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
            dispatch(toggleLoading());
            return ({ error: err.response.data.error});
        } else { 
            console.log(err);
            dispatch(toggleLoading());
            return ({ error: 'Internal Server Error' });
        }
    }
}

export const setCurrentEnemyHp = currentEnemyHp => {
    return {
        type: SET_CURRENT_ENEMY_HP,
        currentEnemyHp
    }
}

export const setCurrentPlayerHp = currentPlayerHp => {
    return {
        type: SET_CURRENT_PLAYER_HP,
        currentPlayerHp
    }
}

export const setCurrentEnemyStats = currentEnemy => {
    return {
        type: SET_CURRENT_ENEMY_STATS,
        currentEnemy
    }
}

export const toggleLoading = () => ({
    type: TOGGLE_LOADING
});
        

export const enemyTakesDamage = damage => {
    return {
        type: ENEMY_TAKES_DAMAGE,
        damage
    }
}

export const playerTakesDamage = damage => {
    return {
        type: PLAYER_TAKES_DAMAGE,
        damage
    }
}

export const setCurrentLocation = location => {
    return {
        type: SET_CURRENT_LOCATION,
        location
    }
}

export const setNotificationMessage = message => {
    return {
        type: SET_NOTIFICATION_MESSAGE,
        message
    }
}

export const setNotificationClass = classStr => {
    return {
        type: SET_NOTIFICATION_CLASS,
        classStr
    }
}

export const setLogin = isLoggedIn => ({
    type: LOGIN,
    isLoggedIn
})

export const setLoadingEnemy = () => ({
    type: SET_LOADING_ENEMY
})

export const cookieChecked = () => ({
    type: COOKIE_CHECKED
})