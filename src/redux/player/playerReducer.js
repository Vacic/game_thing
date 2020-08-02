const playerState = {
    weapon: 'Fists',
    hp: 70,
    dmg: 20, //5
    attSpd: 0.3, //1
    def: 0,
    eva: 2,
    equipped: {}
}

const playerReducer = (state = playerState) => {
    return state;
}

export default playerReducer;