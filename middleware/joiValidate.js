const joiValidate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const { details } = error;
      const message = details.map((m) => m.message);
      res.status(422).json({ error: message });
    } else next();
  };
};

module.exports = joiValidate;
