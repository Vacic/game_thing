const itemListState = {
    weapons: {
        wooden_sword: {
            name: 'Wooden Sword',
            attSpd: 1.7,
            dmg: 10
        },
        bronze_sword: {
            name: 'Bronze Sword',
            attSpd: 1.6,
            dmg: 15
        },
        iron_sword: {
            name: 'Iron Sword',
            attSpd: 1.6,
            dmg: 20
        },
        steel_sword: {
            name: 'Iron Sword',
            attSpd: 1.5,
            dmg: 25
        },
        diamond_sword: {
            name: 'Diamond Sword',
            attSpd: 1.2,
            dmg: 40
        }
    },

    shields: {
        wooden_shield: {
            name: 'Wooden Shield',
            hp: 10,
            def: 2
        },
        bronze_shield: {
            name: 'Bronze Shield',
            hp: 20,
            def: 3
        },
        iron_shield: {
            name: 'Iron Shield',
            hp: 30,
            def: 4
        },
        steel_shield: {
            name: 'Steel Shield',
            hp: 40,
            def: 6
        },
        diamond_shield: {
            name: 'Diamond Shield',
            hp: 60,
            def: 10
        }
    },

    helmets: {
        wooden_helmet: {
            name: 'Wooden Helmet',
            hp: 3,
            def: 1
        },
        bronze_helmet: {
            name: 'Bronze Helmet',
            hp: 5,
            def: 2
        },
        iron_helmet: {
            name: 'Iron Helmet',
            hp: 8,
            def: 3
        },
        steel_helmet: {
            name: 'Steel Helmet',
            hp: 12,
            def: 5
        },
        diamond_helmet: {
            name: 'Diamond Helmet',
            hp: 20,
            def: 8
        }
    },

    armor: {
        wooden_armor: {
            name: 'Wood Armor',
            hp: 15,
            def: 3,
            eva: 2
        },
        bronze_armor: {
            name: 'Bronze Armor',
            hp: 30,
            def: 7,
            eva: 4
        },
        iron_armor: {
            name: 'Iron Armor',
            hp: 45,
            def: 11,
            eva: 6
        },
        steel_armor: {
            name: 'Steel Armor',
            hp: 60,
            def: 15,
            eva: 8
        },
        diamond_armor: {
            name: 'Diamond Armor',
            hp: 100,
            def: 30,
            eva: 15
        }
    },

    pants: {
        wooden_pants: {
            name: 'Wooden Pants',
            hp: 5,
            def: 2
        },
        bronze_platelegs: {
            name: 'Bronze Platelegs',
            hp: 10,
            def: 3
        },
        iron_platelegs: {
            name: 'Iron Platelegs',
            hp: 15,
            def: 4,
            eva: 1
        },
        steel_platelegs: {
            name: 'Steel Platelegs',
            hp: 20,
            def: 6,
            eva: 2
        },
        diamond_platelegs: {
            name: 'Diamond Platelegs',
            hp: 40,
            def: 10,
            eva: 5
        }
    },

    boots: {
        wooden_boots: {
            name: 'Wooden Boots',
            eva: 1
        },
        bronze_boots: {
            name: 'Bronze Boots',
            def: 1,
            eva: 2
        },
        iron_boots: {
            name: 'Iron Boots',
            def: 2,
            eva: 4,
            attSpd: 0.1
        },
        steel_boots: {
            name: 'Steel Boots',
            def: 3,
            eva: 6,
            attSpd: 0.2
        },
        diamond_boots: {
            name: 'Diamond Boots',
            def: 5,
            eva: 10,
            attSpd: 0.5
        }
    },

    healing_items: {
        chicken_meat: {
            name: 'Chicken Meat',
            heal: 20
        },

        cow_meat: {
            name: 'Chicken Meat',
            heal: 50
        },

        rations: {
            name: 'Chicken Meat',
            heal: 100
        },

        health_potion: {
            name: 'Health Potion',
            heal: 200
        }
    }
}

const itemListReducer = (state = itemListState) => {
    return state;
}

export default itemListReducer;