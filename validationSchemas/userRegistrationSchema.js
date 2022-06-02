const Joi = require("joi");

const userRegistrationSchema = Joi.object({
  username: Joi.string().required().min(2).max(20).messages({
    "string.min": "Username Must Be 2 to 20 Characters Long",
    "string.max": "Username Must Be 2 to 20 Characters Long",
    "string.empty": "Username is Required",
    "any.required": "Username is Required",
  }),
  email: Joi.string()
    .required()
    .regex(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    )
    .messages({
      "string.pattern.base": "Please Enter a Valid Email",
      "string.empty": "Email is Required",
      "any.required": "Email is Required",
    }),
  password: Joi.string()
    .required()
    .min(6)
    .regex(
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!"#$%&'()*+,-.\\/:;<=>?@\[\]^_`{|}~]).{0,}$/
    )
    .messages({
      "string.min": "Password Must Be at Least 6 Characters Long",
      "string.pattern.base":
        "Password Must Contain at Least One Number, Letter and Symbol",
      "string.empty": "Password is Required",
      "any.required": "Password is Required",
    }),
  playerStats: Joi.object()
    .required()
    .messages({ "any.required": "Player Stats are Required" }),
  inventory: Joi.object()
    .required()
    .messages({ "any.required": "Inventory is Required" }),
  equipment: Joi.object()
    .required()
    .messages({ "any.required": "Equipment is Required" }),
  quickBarEquipment: Joi.array()
    .required()
    .messages({ "any.required": "Quick Bar Equipment is Required" }),
  currentHp: Joi.number()
    .integer()
    .required()
    .messages({ "any.required": "Current Hp is Required" }),
  currentLocation: Joi.string()
    .required()
    .messages({ "any.required": "Current Location is Required" }),
});

module.exports = userRegistrationSchema;
