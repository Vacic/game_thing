const locationEnemiesState = {
    farm: {
        img: process.env.PUBLIC_URL + '/location_imgs/farm.png',
        cow: {
            name: 'Cow',
            hp: 50,
            dmg: 5,
            attSpd: 2,
            def: 10,
            eva: 2,
            drops: {
                cow_meat: { min: 0, max: 60 },
                leather_boots: { min: 61, max: 81 },
                wooden_helmet: { min: 82, max: 97 }
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
                chicken_meat: { min: 1, max: 85 },
                leather_boots: { min: 86, max: 91 }
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
                wooden_sword: { min: 0, max:15 },
                wooden_armor: { min: 16, max: 31 },
                wooden_pants: { min: 32, max: 47 },
                wooden_shield: { min: 48, max: 63 },
                leather_boots: { min: 64, max: 79 },
                wooden_helmet: { min: 80, max: 95 }
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
            eva: 5
        },
        bandit_leader: {
            name: 'Bandit Leader',
            hp: 150,
            dmg: 20,
            attSpd: 1.8,
            def: 8,
            eva: 10
        },
        bandit_archer: {
            name: 'Bandit Archer',
            hp: 50,
            dmg: 25,
            attSpd: 1.5,
            def: 3,
            eva: 3
        },
        bandit_swordsman: {
            name: 'Bandit Swordsman',
            hp: 100,
            dmg: 18,
            attSpd: 2.5,
            def: 7,
            eva: 7
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