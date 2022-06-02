const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    playerStats: Object,
    inventory: Object,
    equipment: Object,
    quickBarEquipment: Array,
    currentHp: Number,
    currentLocation: String,
  },
  { collection: "user_progress" }
);

module.exports = mongoose.model("user_progress", userProgressSchema);
