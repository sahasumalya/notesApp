const {userModel} = require("../models/user");

async function isRegistered(email)
{
    let result = {};
    try
    {
        letDbRes = await userModel.findOne({email:email},'name');
        if(letDbRes)
        {
            result.registered = true;
            result.message = "User is already registered with the email";
        }
        else
            result.registered = false;
        return result;

    }
    catch(error)
    {
        result.error = error;
        return result;
    }
}

module.exports = isRegistered;