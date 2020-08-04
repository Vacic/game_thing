import { UPDATE_PLAYER_STATS, UPDATE_PLAYER_EQUIPMENT } from "./playerTypes";

const playerState = {
    stats: {
        weapon: 'Fists',
        hp: 80,
        dmg: 5, //5
        attSpd: 1, //1
        def: 0,
        eva: 1
    },

    equipped: {}
}

const playerReducer = (state = playerState, action) => {
    switch(action.type) {
        case UPDATE_PLAYER_STATS: return {
            ...state,
            stats: action.newStats
        }

        case UPDATE_PLAYER_EQUIPMENT: return {
            ...state,
            equipped: action.newEquip
        }

        default: return state;
    }
}

export default playerReducer;