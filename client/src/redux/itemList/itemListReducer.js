const itemListState = {
  // Weapons
  wooden_sword: {
    img: "/item_imgs/wooden_sword.png",
    name: "Wooden Sword",
    type: "weapon",
    stats: {
      attSpd: 1.7,
      dmg: 10,
    },
  },
  bronze_sword: {
    img: "/item_imgs/bronze_sword.png",
    name: "Bronze Sword",
    type: "weapon",
    stats: {
      attSpd: 1.6,
      dmg: 15,
    },
  },
  iron_sword: {
    img: "/item_imgs/iron_sword.png",
    name: "Iron Sword",
    type: "weapon",
    stats: {
      attSpd: 1.6,
      dmg: 20,
    },
  },
  iron_dagger: {
    img: "/item_imgs/iron_dagger.png",
    name: "Iron Dagger",
    type: "weapon",
    stats: {
      attSpd: 1,
      dmg: 12,
    },
  },
  steel_dagger: {
    img: "/item_imgs/steel_dagger.png",
    name: "Steel Dagger",
    type: "weapon",
    stats: {
      attSpd: 0.8,
      dmg: 14,
    },
  },
  steel_sword: {
    img: "/item_imgs/steel_sword.png",
    name: "Steel Sword",
    type: "weapon",
    stats: {
      attSpd: 1.5,
      dmg: 25,
    },
  },
  diamond_sword: {
    img: "/item_imgs/diamond_sword.png",
    name: "Diamond Sword",
    type: "weapon",
    stats: {
      attSpd: 1.2,
      dmg: 40,
    },
  },

  // Shields
  wooden_shield: {
    img: "/item_imgs/wooden_shield.png",
    name: "Wooden Shield",
    type: "shield",
    stats: {
      hp: 10,
      def: 2,
    },
  },
  bronze_shield: {
    img: "/item_imgs/bronze_shield.png",
    name: "Bronze Shield",
    type: "shield",
    stats: {
      hp: 20,
      def: 3,
    },
  },
  iron_shield: {
    img: "/item_imgs/iron_shield.png",
    name: "Iron Shield",
    type: "shield",
    stats: {
      hp: 30,
      def: 4,
    },
  },
  steel_shield: {
    img: "/item_imgs/steel_shield.png",
    name: "Steel Shield",
    type: "shield",
    stats: {
      hp: 40,
      def: 6,
    },
  },
  diamond_shield: {
    img: "/item_imgs/diamond_shield.png",
    name: "Diamond Shield",
    type: "shield",
    stats: {
      hp: 60,
      def: 10,
    },
  },

  // Helmets
  wooden_helmet: {
    img: "/item_imgs/wooden_helmet.png",
    name: "Wooden Helmet",
    type: "helmet",
    stats: {
      hp: 3,
      def: 1,
    },
  },
  bronze_helmet: {
    img: "/item_imgs/bronze_helmet.png",
    name: "Bronze Helmet",
    type: "helmet",
    stats: {
      hp: 5,
      def: 2,
    },
  },
  iron_helmet: {
    img: "/item_imgs/iron_helmet.png",
    name: "Iron Helmet",
    type: "helmet",
    stats: {
      hp: 8,
      def: 3,
    },
  },
  steel_helmet: {
    img: "/item_imgs/steel_helmet.png",
    name: "Steel Helmet",
    type: "helmet",
    stats: {
      hp: 12,
      def: 5,
    },
  },
  diamond_helmet: {
    img: "/item_imgs/diamond_helmet.png",
    name: "Diamond Helmet",
    type: "helmet",
    stats: {
      hp: 20,
      def: 8,
    },
  },

  // Armor
  wooden_armor: {
    img: "/item_imgs/wooden_armor.png",
    name: "Wooden Armor",
    type: "armor",
    stats: {
      hp: 15,
      def: 3,
      eva: 2,
    },
  },
  bronze_armor: {
    img: "/item_imgs/bronze_armor.png",
    name: "Bronze Armor",
    type: "armor",
    stats: {
      hp: 30,
      def: 7,
      eva: 4,
    },
  },
  iron_armor: {
    img: "/item_imgs/iron_armor.png",
    name: "Iron Armor",
    type: "armor",
    stats: {
      hp: 45,
      def: 11,
      eva: 6,
    },
  },
  steel_armor: {
    img: "/item_imgs/steel_armor.png",
    name: "Steel Armor",
    type: "armor",
    stats: {
      hp: 60,
      def: 15,
      eva: 8,
    },
  },
  diamond_armor: {
    img: "/item_imgs/diamond_armor.png",
    name: "Diamond Armor",
    type: "armor",
    stats: {
      hp: 100,
      def: 30,
      eva: 15,
    },
  },

  // Pants
  wooden_pants: {
    img: "/item_imgs/wooden_pants.png",
    name: "Wooden Pants",
    type: "pants",
    stats: {
      hp: 5,
      def: 2,
    },
  },
  bronze_platelegs: {
    img: "/item_imgs/bronze_platelegs.png",
    name: "Bronze Platelegs",
    type: "pants",
    stats: {
      hp: 10,
      def: 3,
    },
  },
  iron_platelegs: {
    img: "/item_imgs/iron_platelegs.png",
    name: "Iron Platelegs",
    type: "pants",
    stats: {
      hp: 15,
      def: 4,
      eva: 1,
    },
  },
  steel_platelegs: {
    img: "/item_imgs/steel_platelegs.png",
    name: "Steel Platelegs",
    type: "pants",
    stats: {
      hp: 20,
      def: 6,
      eva: 2,
    },
  },
  diamond_platelegs: {
    img: "/item_imgs/diamond_platelegs.png",
    name: "Diamond Platelegs",
    type: "pants",
    stats: {
      hp: 40,
      def: 10,
      eva: 5,
    },
  },

  // Boots: {
  leather_boots: {
    img: "/item_imgs/leather_boots.png",
    name: "Leather Boots",
    type: "boots",
    stats: {
      eva: 1,
    },
  },
  bronze_boots: {
    img: "/item_imgs/bronze_boots.png",
    name: "Bronze Boots",
    type: "boots",
    stats: {
      def: 1,
      eva: 2,
    },
  },
  iron_boots: {
    img: "/item_imgs/iron_boots.png",
    name: "Iron Boots",
    type: "boots",
    stats: {
      def: 2,
      eva: 4,
      attSpd: -0.1,
    },
  },
  steel_boots: {
    img: "/item_imgs/steel_boots.png",
    name: "Steel Boots",
    type: "boots",
    stats: {
      def: 3,
      eva: 6,
      attSpd: -0.2,
    },
  },
  diamond_boots: {
    img: "/item_imgs/diamond_boots.png",
    name: "Diamond Boots",
    type: "boots",
    stats: {
      def: 5,
      eva: 10,
      attSpd: -0.5,
    },
  },

  // healing_items
  egg: {
    img: "/item_imgs/egg.png",
    name: "Egg",
    stats: {
      heal: 10,
    },
  },

  chicken_meat: {
    img: "/item_imgs/chicken_meat.png",
    name: "Chicken Meat",
    stats: {
      heal: 20,
    },
  },

  cow_meat: {
    img: "/item_imgs/cow_meat.png",
    name: "Cow Meat",
    stats: {
      heal: 50,
    },
  },

  bull_meat: {
    img: "/item_imgs/bull_meat.png",
    name: "Bull Meat",
    stats: {
      heal: 70,
    },
  },

  wolf_meat: {
    img: "/item_imgs/wolf_meat.png",
    name: "Wolf Meat",
    stats: {
      heal: 80,
    },
  },

  first_aid_kit: {
    img: "/item_imgs/first_aid_kit.png",
    name: "First Aid Kit",
    stats: {
      heal: 100,
    },
  },

  health_potion: {
    img: "/item_imgs/health_potion.png",
    name: "Health Potion",
    stats: {
      heal: 200,
    },
  },
};

const itemListReducer = (state = itemListState) => {
  return state;
};

export default itemListReducer;
