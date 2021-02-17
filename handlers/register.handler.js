const {userModel} = require("../models/user");
const registrationCheck = require("../modules/registrationCheck");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {validateRegister} = require("../modules/validationInput");

async function register(req,res)
{

    const validationResponse = validateRegister(req.body);
 
    if (validationResponse.error) {
      validationResponse.error.statusCode = 400;
      return validationResponse.error;
    }
    let request_body = req.body;
    let name = request_body.name;
    let email = request_body.email;
    let raw_passwrod = request_body.password;

    try{
        let registerResult = await registrationCheck(email);
        if(registerResult.error)
            return {
                status : 500,
                message : registerResult.error
            }
        if(registerResult.registered)
            return {
                status : 500,
                message : registerResult.message
            }

        let encrypted_password = await bcrypt.hash(raw_passwrod, saltRounds);
        const dbObject = {
            name : name,
            email : email,
            password : encrypted_password
        }

        await userModel.insertMany([dbObject]);

        return {
            status : 200,
            message : "SUccesfully registered"
        }
        

    }
    catch(error)
    {
        return {
            status : 500,
            message : JSON.stringify(error)
        }
    }
}

module.exports = register;