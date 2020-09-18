const Joi = require('joi');

const userLoginSchema = Joi.object({
    email: Joi.string().required()
           .regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
           .messages({
                        'string.pattern.base': 'Please Enter a Valid Email',
                        'string.empty': 'Please Enter Your Email',
                        'any.required': 'Please Enter Your Email'
                    }),
    password: Joi.string().required()
              .messages({
                  'string.empty': 'Please Enter Your Password',
                  'any.required': 'Please Enter Your Password'
              }),
});

module.exports = userLoginSchema;