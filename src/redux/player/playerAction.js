import { UPDATE_PLAYER_EQUIPMENT, UPDATE_PLAYER_STATS } from './playerTypes';

export const updatePlayerEquipment = newEquip => {
    return {
        type: UPDATE_PLAYER_EQUIPMENT,
        newEquip
    }
}

export const updatePlayerStats = newStats => {
    return {
        type: UPDATE_PLAYER_STATS,
        newStats
    }
}