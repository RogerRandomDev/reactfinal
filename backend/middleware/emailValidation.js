var emailValidator = require("deep-email-validator");

async function isEmailValid(email) {
  return emailValidator.validate(email);
}

//create a server object:
const emailValidation = async (email) => {
  const { valid, reason, validators } = await isEmailValid(`${email}`);
  return { valid, reason, validators };
};
export default emailValidation