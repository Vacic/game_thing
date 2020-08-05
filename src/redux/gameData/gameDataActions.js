import { SET_CURRENT_PLAYER_HP, SET_CURRENT_ENEMY_HP, SET_CURRENT_ENEMY_STATS, SET_LOADING, ENEMY_TAKES_DAMAGE, PLAYER_TAKES_DAMAGE, SET_CURRENT_LOCATION } from './gameDataTypes';

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

export const setLoading = isLoading => {
    return {
        type: SET_LOADING,
        isLoading
    }
}

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