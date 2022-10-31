var http = require("http");
var emailValidator = require("deep-email-validator");

async function isEmailValid(email) {
  return emailValidator.validate(email);
}

//create a server object:
http
  .createServer(async function (req, res) {
    const { valid, reason, validators } = await isEmailValid(
      "jnogues@increnta.com"
    );

    res.write(
      `${valid ? "Email is valid" : "Email is invalid"} : reason-${
        reason ? `${reason}` : "is there"
      } : ${JSON.stringify(validators)}`
    );
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
