const createQueryValidationSchema = {
  filter: {
    isString: {
      errorMessage: "filter must be a string",
    },
    notEmpty: {
      errorMessage: "filter cannot be empty",
    },
    isLength: {
      options: { min: 3, max: 15 },
    },
  },
};

module.exports = createQueryValidationSchema;
