const itemListState = {
// Weapons
    wooden_sword: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_sword.png',
        name: 'Wooden Sword',
        type: 'weapon',
        stats: {
            attSpd: 1.7,
            dmg: 10
        }
    },
    bronze_sword: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_sword.png',
        name: 'Bronze Sword',
        type: 'weapon',
        stats: {
            attSpd: 1.6,
            dmg: 15
        }
    },
    iron_sword: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_sword.png',
        name: 'Iron Sword',
        type: 'weapon',
        stats: {
            attSpd: 1.6,
            dmg: 20
        }
    },
    steel_sword: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_sword.png',
        name: 'Iron Sword',
        type: 'weapon',
        stats: {
            attSpd: 1.5,
            dmg: 25
        }
    },
    diamond_sword: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_sword.png',
        name: 'Diamond Sword',
        type: 'weapon',
        stats: {
            attSpd: 1.2,
            dmg: 40
        }
    },

// Shields
    wooden_shield: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_shield.png',
        name: 'Wooden Shield',
        type: 'shield',
        stats: {
            hp: 10,
            def: 2
        }
    },
    bronze_shield: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_shield.png',
        name: 'Bronze Shield',
        type: 'shield',
        stats: {
            hp: 20,
            def: 3
        }
    },
    iron_shield: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_shield.png',
        name: 'Iron Shield',
        type: 'shield',
        stats: {
            hp: 30,
            def: 4
        }
    },
    steel_shield: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_shield.png',
        name: 'Steel Shield',
        type: 'shield',
        stats: {
            hp: 40,
            def: 6
        }
    },
    diamond_shield: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_shield.png',
        name: 'Diamond Shield',
        type: 'shield',
        stats: {
            hp: 60,
            def: 10
        }
    },

// Helmets
    wooden_helmet: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_helmet.png',
        name: 'Wooden Helmet',
        type: 'helmet',
        stats: {
            hp: 3,
            def: 1
        }
    },
    bronze_helmet: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_helmet.png',
        name: 'Bronze Helmet',
        type: 'helmet',
        stats: {
            hp: 5,
            def: 2
        }
    },
    iron_helmet: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_helmet.png',
        name: 'Iron Helmet',
        type: 'helmet',
        stats: {
            hp: 8,
            def: 3
        }
    },
    steel_helmet: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_helmet.png',
        name: 'Steel Helmet',
        type: 'helmet',
        stats: {
            hp: 12,
            def: 5
        }
    },
    diamond_helmet: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_helmet.png',
        name: 'Diamond Helmet',
        type: 'helmet',
        stats: {
            hp: 20,
            def: 8
        }
    },

// Armor
    wooden_armor: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_armor.png',
        name: 'Wooden Armor',
        type: 'armor',
        stats: {
            hp: 15,
            def: 3,
            eva: 2
        }
    },
    bronze_armor: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_armor.png',
        name: 'Bronze Armor',
        type: 'armor',
        stats: {
            hp: 30,
            def: 7,
            eva: 4
        }
    },
    iron_armor: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_armor.png',
        name: 'Iron Armor',
        type: 'armor',
        stats: {
            hp: 45,
            def: 11,
            eva: 6
        }
    },
    steel_armor: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_armor.png',
        name: 'Steel Armor',
        type: 'armor',
        stats: {
            hp: 60,
            def: 15,
            eva: 8
        }
    },
    diamond_armor: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_armor.png',
        name: 'Diamond Armor',
        type: 'armor',
        stats: {
            hp: 100,
            def: 30,
            eva: 15
        }
    },

// Pants
    wooden_pants: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_pants.png',
        name: 'Wooden Pants',
        type: 'pants',
        stats: {
            hp: 5,
            def: 2
        }
    },
    bronze_platelegs: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_pants.png',
        name: 'Bronze Platelegs',
        type: 'pants',
        stats: {
            hp: 10,
            def: 3
        }
    },
    iron_platelegs: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_pants.png',
        name: 'Iron Platelegs',
        type: 'pants',
        stats: {
            hp: 15,
            def: 4,
            eva: 1
        }
    },
    steel_platelegs: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_pants.png',
        name: 'Steel Platelegs',
        type: 'pants',
        stats: {
            hp: 20,
            def: 6,
            eva: 2
        }
    },
    diamond_platelegs: {
        img: process.env.PUBLIC_URL + '/item_imgs/wooden_pants.png',
        name: 'Diamond Platelegs',
        type: 'pants',
        stats: {
            hp: 40,
            def: 10,
            eva: 5
        }
    },

// Boots: {
    leather_boots: {
        img: process.env.PUBLIC_URL + '/item_imgs/leather_boots.png',
        name: 'Leather Boots',
        type: 'boots',
        stats: {
            eva: 1
        }
    },
    bronze_boots: {
        img: process.env.PUBLIC_URL + '/item_imgs/leather_boots.png',
        name: 'Bronze Boots',
        type: 'boots',
        stats: {
            def: 1,
            eva: 2
        }
    },
    iron_boots: {
        img: process.env.PUBLIC_URL + '/item_imgs/leather_boots.png',
        name: 'Iron Boots',
        type: 'boots',
        stats: {
            def: 2,
            eva: 4,
            attSpd: -0.1
        }
    },
    steel_boots: {
        img: process.env.PUBLIC_URL + '/item_imgs/leather_boots.png',
        name: 'Steel Boots',
        type: 'boots',
        stats: {
            def: 3,
            eva: 6,
            attSpd: -0.2
        }
    },
    diamond_boots: {
        img: process.env.PUBLIC_URL + '/item_imgs/leather_boots.png',
        name: 'Diamond Boots',
        type: 'boots',
        stats: {
            def: 5,
            eva: 10,
            attSpd: -0.5
        }
    },

// healing_items
    chicken_meat: {
        img: process.env.PUBLIC_URL + '/item_imgs/chicken_meat.png',
        name: 'Chicken Meat',
        stats: {
            heal: 20
        }
    },

    cow_meat: {
        img: process.env.PUBLIC_URL + '/item_imgs/cow_meat.png',
        name: 'Cow Meat',
        stats: {
            heal: 50
        }
    },

    first_aid_kit: {
        img: process.env.PUBLIC_URL + '/item_imgs/first_aid_kit.png',
        name: 'First Aid Kit',
        stats: {
            heal: 100
        }
    },

    health_potion: {
        img: process.env.PUBLIC_URL + '/item_imgs/health_potion.png',
        name: 'Health Potion',
        stats: {
            heal: 200
        }
    }
}

const itemListReducer = (state = itemListState) => {
    return state;
}

export default itemListReducer;