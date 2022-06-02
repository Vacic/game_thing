const Joi = require("joi");

const userUpdateSchema = Joi.object({
  username: Joi.string().min(2).max(20).messages({
    "string.min": "Username Must Be 2 to 20 Characters Long",
    "string.max": "Username Must Be 2 to 20 Characters Long",
    "string.empty": "Username Cannot Be Empty",
  }),
  email: Joi.string()
    .regex(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    )
    .messages({
      "string.pattern.base": "Please Enter a Valid Email",
      "string.empty": "Email Cannot Be Empty",
    }),
  password: Joi.string()
    .min(6)
    .regex(
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!"#$%&'()*+,-.\\/:;<=>?@\[\]^_`{|}~]).{0,}$/
    )
    .messages({
      "string.min": "Password Must Be at Least 6 Characters Long",
      "string.pattern.base":
        "Password Must Contain at Least One Number, Letter and Symbol",
      "string.empty": "Password Cannot Be Empty",
    }),
});

module.exports = userUpdateSchema;
