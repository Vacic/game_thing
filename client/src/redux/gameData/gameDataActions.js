import axios from 'axios';
import Cookies from 'universal-cookie';
import { SET_CURRENT_PLAYER_HP, SET_CURRENT_ENEMY_HP, SET_CURRENT_ENEMY_STATS, SET_LOADING, ENEMY_TAKES_DAMAGE, PLAYER_TAKES_DAMAGE, SET_CURRENT_LOCATION, LOGIN, SET_LOADING_ENEMY, COOKIE_CHECKED } from './gameDataTypes';
import { populatePlayer, populateUser, updateUser } from '../player/playerAction';
import { setMessage, setNotification } from '../notificationControl/notificationControlActions';
const cookies = new Cookies();

export const login = (email, password) => async dispatch => {
    dispatch(setLoading(true));
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({ email, password });
    try {
        const { data } = await axios.post('http://localhost:3001/auth/login', body, config);
        localStorage.setItem('token', data.token );
        // await axios.post('/auth/login', body, config);
        await dispatch(populateUser());
        await dispatch(populateGame());
        cookies.set('loggedIn', 'yup', { sameSite: true });
        setLogin(true);
        dispatch(setMessage({ msg: 'Logged In Successfully' }));
        dispatch(setNotification({ msg: `Logged In Successfully`, classType: 'success' }));
        return true;
    } catch (err) {
        cookies.remove('loggedIn');
        dispatch(setNotification({ msg: `Login Failed`, classType: 'danger' }));
        if (err.response && err.response.data.error) {
            dispatch(setLoading(false));
            dispatch(setMessage({ msg: err.response.data.error, classType: 'danger' }));
        } else { 
            console.log(err.response.statusText);
            dispatch(setLoading(false));
            dispatch(setMessage({ msg: 'Internal Server Error', classType: 'danger' }));
        }
    }
}

export const logout = () => dispatch => {
    cookies.remove('loggedIn');
    dispatch(setLoading(true));
    let number = '';
    for(let i=0; i<8; i++) number += Math.round(Math.random()*10);
    localStorage.removeItem('progress');
    const username = `Guest_${number}`;

    dispatch(populatePlayer({
        playerStats: {
            weapon: 'Fists',
            hp: 80,
            dmg: 5, //5
            attSpd: 1, //1
            def: 0,
            eva: 1
        }, 
        equipment: {}, 
        quickBarEquipment: ['', '', ''],
        inventory: {}
    }));
    dispatch(setCurrentEnemyStats({
        name: 'Select Location',
        hp: 0,
        dmg: 0,
        attSpd: 0,
        def: 0,
        eva: 0
    }));
    dispatch(setCurrentEnemyHp(0));
    dispatch(setCurrentPlayerHp(80));
    dispatch(setCurrentLocation('farm'));
    dispatch(updateUser({ username }))
    dispatch(setLogin(false));
    dispatch(setLoading(false));
    dispatch(setLoadingEnemy(false));
    dispatch(setNotification({ msg: `Logged Out Successfully`, classType: 'danger' }));
    return true;
}

export const populateGame = () => async dispatch => {
    dispatch(setLoading(true));
    try {
         const { data } = await axios.get(`http://localhost:3001/users/progress`, { headers: { token: localStorage.getItem('token')} });
        // const { data } = await axios.get(`/users/progress`, { withCredentials: true });
        const { currentHp, currentLocation, inventory = {}, playerStats, equipment = {}, quickBarEquipment = ['', '', ''] } = data;
        dispatch(populatePlayer({ playerStats, inventory, equipment, quickBarEquipment }));
        dispatch(setCurrentPlayerHp(currentHp));
        dispatch(setCurrentLocation(currentLocation));
        dispatch(setLogin(true));
        dispatch(setLoading(false));
        dispatch(setNotification({ msg: `Save File Loaded`, classType: 'success' }));
    } catch (err) {
        cookies.remove('loggedIn');
        dispatch(setNotification({ msg: `Save File Failed to Load`, classType: 'danger' }));
        if (err.response && err.response.data && err.response.data.error) {
            dispatch(setLoading(false));
            dispatch(setMessage({ msg: `${err.response.data.error} - Could Not Load Saved Data`, classType: 'danger' }));
        } else { 
            console.log(err);
            dispatch(setLoading(false));
            dispatch(setMessage({ msg: 'Internal Server Error - Could Not Load Saved Data', classType: 'danger' }));
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

export const setLoading = isLoading => ({
    type: SET_LOADING,
    isLoading
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

export const setLogin = isLoggedIn => ({
    type: LOGIN,
    isLoggedIn
})

export const setLoadingEnemy = isLoading => ({
    type: SET_LOADING_ENEMY,
    isLoading
})

export const cookieChecked = () => ({
    type: COOKIE_CHECKED
})