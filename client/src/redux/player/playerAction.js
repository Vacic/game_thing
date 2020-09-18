import { UPDATE_PLAYER_EQUIPMENT, UPDATE_PLAYER_STATS, UPDATE_PLAYER_QUICKBAR_EQUIPMENT, UPDATE_PLAYER_NAME, UPDATE_INVENTORY, REDUCE_SINGLE_ITEM } from './playerTypes';

export const populatePlayer = (playerStats, playerName, equipment, quickBarEquipment) => async dispatch => {
    dispatch(updatePlayerEquipment(equipment));
    dispatch(updatePlayerName(playerName));
    dispatch(updatePlayerStats(playerStats));
    dispatch(updatePlayerQuickBarEquipment(quickBarEquipment));
}

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

export const updatePlayerQuickBarEquipment = newQBEquip => {
    return {
        type: UPDATE_PLAYER_QUICKBAR_EQUIPMENT,
        newQBEquip
    }
}

export const updatePlayerName = name => ({
    type: UPDATE_PLAYER_NAME,
    name
});

export const updateInventory = inventory => {
    return {
        type: UPDATE_INVENTORY,
        inventory
    }
}

export const reduceSingleItem = itemName => {
    return {
        type: REDUCE_SINGLE_ITEM,
        itemName
    }
}