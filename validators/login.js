import Joi from '@hapi/joi';

export default Joi.object({
  username: Joi.string().email().required().error(errors => {
    errors.forEach(err => {
      switch (err.code) {
        case "string.base":
          err.message = `Email address is not valid.`;
          break;
        case "any.empty":
          err.message = "An email is required.";
          break;
        case "string.email":
          err.message = `Email address provided is not valid.`;
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  password: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.code) {
        case "string.base":
          err.message = `Password is not valid.`;
          break;
        case "any.empty":
          err.message = "A password is required.";
          break;
        default:
          break;
      }
    });
    return errors;
  })
});