const locationEnemiesState = {
    farm: {
        img: process.env.PUBLIC_URL + '/location_imgs/farm.png',
        cow: {
            name: 'Cow',
            hp: 45,
            dmg: 5,
            attSpd: 1.8,
            def: 5,
            eva: 2,
            drops: {
                cow_meat: { min: 0, max: 65 },
                leather_boots: { min: 65, max: 75 },
                wooden_helmet: { min: 75, max: 85 }
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
            hp: 55,
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
                cow_meat: { min: 42, max: 47 }
            }
        }
    },
    goblin_camp: {
        img: process.env.PUBLIC_URL + '/location_imgs/goblin_camp.png',
        goblin: {
            name: 'Goblin',
            hp: 50,
            dmg: 10,
            attSpd: 1.5,
            def: 1,
            eva: 7,
            drops: {
                bronze_platelegs: { min: 0, max: 15 },
                bronze_boots: { min: 15, max: 30 },
                bronze_helmet: { min: 30, max: 40 },
                iron_boots: { min: 40, max: 40.3 },
                iron_helmet: { min: 40.3, max: 40.6 },
                iron_platelegs: { min: 40.6, max: 40.9 },
                chicken_meat: { min: 40.9, max: 50.9}
            }
        },
        goblin_archer: {
            name: 'Goblin Archer',
            hp: 30,
            dmg: 18,
            attSpd: 1.5,
            def: 0,
            eva: 1,
            drops: {
                bronze_boots: { min: 0, max: 20 },
                bronze_helmet: { min: 20, max: 40 },
                iron_boots: { min: 40, max: 41 },
                iron_helmet: { min: 41, max: 42 },
                chicken_meat: { min: 42, max: 72}
            }
        },
        goblin_brute: {
            name: 'Goblin Brute',
            hp: 100,
            dmg: 18,
            attSpd: 2.2,
            def: 10,
            eva: 5,
            drops: {
                bronze_sword: { min: 0, max: 10 },
                bronze_armor: { min: 10, max: 20 },
                bronze_platelegs: { min: 20, max: 30 },
                bronze_shield: { min: 30, max: 40 },
                iron_sword: { min: 40, max: 40.2 },
                iron_armor: { min: 40.2, max: 40.4 },
                iron_platelegs: { min: 40.4, max: 40.6 },
                iron_shield: { min: 40.6, max: 40.8 },
                cow_meat: { min: 40.8, max: 60}
            }
        },
        goblin_shaman: {
            name: 'Goblin Shaman',
            hp: 40,
            dmg: 30,
            attSpd: 2,
            def: 0,
            eva: 0,
            drops: {
                bronze_sword: { min: 0, max: 15 },
                bronze_armor: { min: 15, max: 30 },
                bronze_platelegs: { min: 30, max: 45 },
                bronze_shield: { min: 45, max: 60 },
                iron_sword: { min: 60, max: 61 },
                iron_armor: { min: 61, max: 61.2 },
                iron_platelegs: { min: 61.2, max: 61.4 },
                iron_shield: { min: 61.4, max: 61.6 },
                first_aid_kit: { min: 61.6, max: 65}
            }
        },
        goblin_leader: {
            name: 'Goblin Leader',
            hp: 120,
            dmg: 16,
            attSpd: 1.9,
            def: 10,
            eva: 5,
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
                first_aid_kit: { min: 15, max: 25}
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
                iron_platelegs: { min: 0, max: 10 },
                iron_boots: { min: 10, max: 20 },
                iron_helmet: { min: 20, max: 30 },
                steel_boots: { min: 30, max: 30.3 },
                steel_helmet: { min: 30.3, max: 30.6 },
                steel_platelegs: { min: 30.6, max: 30.9 },
                cow_meat: { min: 30.9, max: 50.9}
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
                iron_sword: { min: 0, max: 8 },
                iron_armor: { min: 8, max: 16 },
                iron_platelegs: { min: 16, max: 30 },
                iron_shield: { min: 30, max: 45 },
                iron_boots: { min: 45, max: 65 },
                iron_helmet: { min: 65, max: 85 },
                steel_sword: { min: 85, max: 85.5 },
                steel_armor: { min: 85.5, max: 90 },
                steel_platelegs: { min: 90, max: 91 },
                steel_shield: { min: 91, max: 92 },
                steel_boots: { min: 92, max: 97 },
                steel_helmet: { min: 97, max: 100 },
                first_aid_kit: { min: 15, max: 35}
            }
        },
        bandit_archer: {
            name: 'Bandit Archer',
            hp: 40,
            dmg: 25,
            attSpd: 1.5,
            def: 3,
            eva: 3,
            drops: {
                iron_boots: { min: 0, max: 20 },
                iron_helmet: { min: 20, max: 40 },
                iron_armor: { min: 40, max: 45},
                steel_boots: { min: 40, max: 41 },
                steel_helmet: { min: 41, max: 42 },
                steel_armor: { min: 42, max: 42.2},
                first_aid_kit: { min: 42, max: 72}
            }
        },
        bandit_swordsman: {
            name: 'Bandit Swordsman',
            hp: 100,
            dmg: 22,
            attSpd: 2.2,
            def: 7,
            eva: 7,
            drops: {
                iron_sword: { min: 0, max: 15 },
                iron_armor: { min: 15, max: 30 },
                iron_platelegs: { min: 30, max: 45 },
                iron_shield: { min: 45, max: 60 },
                steel_sword: { min: 60, max: 61 },
                steel_armor: { min: 61, max: 61.2 },
                steel_platelegs: { min: 61.2, max: 61.4 },
                steel_shield: { min: 61.4, max: 61.6 },
                first_aid_kit: { min: 61.6, max: 85}
            }
        }
    },
    dungeon: {
        img: process.env.PUBLIC_URL + '/location_imgs/dungeon.png',
        basilisk: {
            name: 'Basilisk',
            hp: 250,
            dmg: 25,
            attSpd: 1.8,
            def: 25,
            eva: 25,
            drops: {
                steel_boots: { min: 0, max: 7 },
                steel_helmet: { min: 7, max: 14 },
                steel_armor: { min: 14, max: 16 },
                steel_platelegs: { min: 16, max: 18 },
                diamond_boots: { min: 18, max: 18.5 },
                diamond_helmet: { min: 18.5, max: 19 },
                diamond_armor: { min: 19, max: 19.2 },
                diamond_platelegs: { min: 19.2, max: 19.4 },
                health_potion: { min: 19.4, max: 19.45}
            }
        },
        harpy: {
            name: 'Harpy',
            hp: 200,
            dmg: 32,
            attSpd: 1,
            def: 9,
            eva: 40,
            drops: {
                steel_boots: { min: 0, max: 30 },
                diamond_boots: { min: 30, max: 40 },
                health_potion: { min: 40, max: 41}
            }
        },
        minotaur: {
            name: 'Minotaur',
            hp: 500,
            dmg: 60,
            attSpd: 2,
            def: 30,
            eva: 15,
            drops: {
                diamond_helmet: { min: 0, max: 18 },
                diamond_boots: { min: 18, max: 36 },
                diamond_sword: { min: 36, max: 52 },
                diamond_armor: { min: 52, max: 68 },
                diamond_platelegs: { min: 68, max: 84 },
                diamond_shield: { min: 84, max: 100 },
                health_potion: { min: 0, max: 100}
            }
        }
    }
    // dragons_lair: {green dragon, red dragon, golden dragon}
}

const locationEnemiesReducer = (state = locationEnemiesState) => {
    return state;
}

export default locationEnemiesReducer;