const locationEnemiesState = {
    farm: {
        img: process.env.PUBLIC_URL + '/location_imgs/farm.png',
        cow: {
            name: 'Cow',
            hp: 50,
            dmg: 5,
            attSpd: 1.8,
            def: 5,
            eva: 2,
            drops: {
                wooden_sword: { min: 0, max: 100 },
                wooden_armor: { min: 0, max: 100 },
                wooden_pants: { min: 0, max: 100 },
                wooden_shield: { min: 0, max: 100 },
                leather_boots: { min: 0, max: 100 },
                wooden_helmet: { min: 0, max: 100 },
                cow_meat: { min: 90, max: 100 }
                // cow_meat: { min: 0, max: 65 },
                // leather_boots: { min: 65, max: 75 },
                // wooden_helmet: { min: 75, max: 85 }
            }
        },
        chicken: {
            name: 'Chicken',
            hp: 20,
            dmg: 3,
            attSpd: 0.8,
            def: 0,
            eva: 1,
            drops: {
                chicken_meat: { min: 0, max: 85 },
                leather_boots: { min: 85, max: 86 }
            }
        },
        farmer: {
            name: 'Farmer',
            hp: 60,
            dmg: 8,
            attSpd: 1.5,
            def: 3,
            eva: 3,
            drops: {                
                wooden_sword: { min: 0, max: 15 },
                wooden_armor: { min: 15, max: 30 },
                wooden_pants: { min: 30, max: 45 },
                wooden_shield: { min: 45, max: 60 },
                leather_boots: { min: 60, max: 75 },
                wooden_helmet: { min: 75, max: 90 },
                cow_meat: { min: 90, max: 100 }
            }
        }
    },
    bandit_camp: {
        img: process.env.PUBLIC_URL + '/location_imgs/bandit_camp.png',
        bandit: {
            name: 'Bandit',
            hp: 70,
            dmg: 10,
            attSpd: 2.1,
            def: 5,
            eva: 5,
            drops: {
                bronze_platelegs: { min: 0, max: 10 },
                bronze_boots: { min: 10, max: 20 },
                bronze_helmet: { min: 20, max: 30 },
                iron_boots: { min: 30, max: 35 },
                iron_helmet: { min: 35, max: 38 },
                iron_platelegs: { min: 38, max: 39 },
                cow_meat: { min: 40, max: 60}
            }
        },
        bandit_leader: {
            name: 'Bandit Leader',
            hp: 150,
            dmg: 20,
            attSpd: 1.8,
            def: 8,
            eva: 10,
            drops: {
                bronze_sword: { min: 0, max: 8 },
                bronze_armor: { min: 8, max: 16 },
                bronze_platelegs: { min: 16, max: 30 },
                bronze_shield: { min: 30, max: 45 },
                bronze_boots: { min: 45, max: 65 },
                bronze_helmet: { min: 65, max: 85 },
                iron_sword: { min: 85, max: 85.5 },
                iron_armor: { min: 85.5, max: 90 },
                iron_platelegs: { min: 90, max: 91 },
                iron_shield: { min: 91, max: 92 },
                iron_boots: { min: 92, max: 97 },
                iron_helmet: { min: 97, max: 100 },
                rations: { min: 15, max: 30}
            }
        },
        bandit_archer: {
            name: 'Bandit Archer',
            hp: 50,
            dmg: 25,
            attSpd: 1.5,
            def: 3,
            eva: 3,
            drops: {
                bronze_boots: { min: 0, max: 20 },
                bronze_helmet: { min: 20, max: 40 },
                iron_boots: { min: 40, max: 41 },
                iron_helmet: { min: 41, max: 42 },
                rations: { min: 42, max: 72}
            }
        },
        bandit_swordsman: {
            name: 'Bandit Swordsman',
            hp: 100,
            dmg: 18,
            attSpd: 2.5,
            def: 7,
            eva: 7,
            drops: {
                bronze_sword: { min: 0, max: 15 },
                bronze_armor: { min: 15, max: 30 },
                bronze_platelegs: { min: 30, max: 45 },
                bronze_shield: { min: 45, max: 60 },
                iron_sword: { min: 60, max: 61 },
                iron_armor: { min: 61, max: 60.2 },
                iron_platelegs: { min: 60.2, max: 60.4 },
                iron_shield: { min: 60.4, max: 60.6 },
                rations: { min: 60.6, max: 85}
            }
        }
    },
    dungeon: {
        img: process.env.PUBLIC_URL + '/location_imgs/dungeon.png',
        basilisk: {
            name: 'Basilisk',
            hp: 200,
            dmg: 25,
            attSpd: 1.8,
            def: 15,
            eva: 25
        },
        harpy: {
            name: 'Harpy',
            hp: 200,
            dmg: 32,
            attSpd: 1,
            def: 9,
            eva: 35
        },
        minotaur: {
            name: 'Minotaur',
            hp: 500,
            dmg: 60,
            attSpd: 2,
            def: 30,
            eva: 15
        }
    }
}

const locationEnemiesReducer = (state = locationEnemiesState) => {
    return state;
}

export default locationEnemiesReducer;