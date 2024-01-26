const createUserValidationSchema = {
  username: {
    isLength: {
      options: { min: 5, max: 32 },
      errorMessage: "Username must be between 5 and 32 characters",
    },
    notEmpty: {
      errorMessage: "Username cannot be emplty",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
  },
  displayName: {
    notEmpty: true,
  },
};

module.exports = createUserValidationSchema;