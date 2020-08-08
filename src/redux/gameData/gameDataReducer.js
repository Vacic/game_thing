import { SET_CURRENT_PLAYER_HP, SET_CURRENT_ENEMY_HP, SET_CURRENT_ENEMY_STATS, SET_LOADING, PLAYER_TAKES_DAMAGE, ENEMY_TAKES_DAMAGE, SET_CURRENT_LOCATION, SET_NOTIFICATION_MESSAGE, SET_NOTIFICATION_CLASS } from "./gameDataTypes";

const gameDataState = {
    currentEnemy: {  // Stores the stats of the enemy that the player is currently fighting
        name: 'Select Location',
        hp: 0,
        dmg: 0,
        attSpd: 0,
        def: 0,
        eva: 0
    },
    globalTimeout: 1000,  // Needs to be the same so things don't get desynced and weird
    currentEnemyHp: 0,  // Current hp required for the ui and HP bar calculation
    currentPlayerHp: 80,// Current hp required for the ui and HP bar calculation
    currentLocation: 'farm',
    notificationMessage: {},
    notificationClass: 'msg-success hide',

    loadingEnemy: false,  // Controls whether the loading screen instead of enemy picture shows up & makes the user unable to spam click locations which otherwise breaks the game
}

const gameDataReducer = (state = gameDataState, action) => {
    switch(action.type) {
        case SET_CURRENT_PLAYER_HP: return {
            ...state,
            currentPlayerHp: action.currentPlayerHp
        }

        case SET_CURRENT_ENEMY_HP: return {
            ...state,
            currentEnemyHp: action.currentEnemyHp
        }

        case SET_CURRENT_ENEMY_STATS: return {
            ...state,
            currentEnemy: action.currentEnemy
        }

        case SET_CURRENT_LOCATION: return {
            ...state,
            currentLocation: action.location
        }

        case SET_NOTIFICATION_MESSAGE: return {
            ...state,
            notificationMessage: action.message
        }

        case SET_NOTIFICATION_CLASS: return {
            ...state,
            notificationClass: action.classStr
        }

        case SET_LOADING: return {
            ...state,
            loadingEnemy: action.isLoading
        }

        case PLAYER_TAKES_DAMAGE: return {
            ...state,
            currentPlayerHp: (state.currentPlayerHp - action.damage) <= 0 ? 0 : state.currentPlayerHp - action.damage
        }

        case ENEMY_TAKES_DAMAGE: return {
            ...state,
            currentEnemyHp: (state.currentEnemyHp - action.damage) <= 0 ? 0 : state.currentEnemyHp - action.damage
        }

        default: return state;
    }
}

export default gameDataReducer;