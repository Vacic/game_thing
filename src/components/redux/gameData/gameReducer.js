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
    currentPlayerHp: 0,// Current hp required for the ui and HP bar calculation
    loadingEnemy: false  // Controls whether the loading screen instead of enemy picture shows up & makes the user unable to spam click locations which otherwise breaks the game
}