const {userModel} = require("../models/user");

async function logout(req)
{
    let apiKeyResult = {};
    if(req.cookies)
       apiKeyResult = req.unsignCookie(req.cookies.apiKey);
    try{
        if(apiKeyResult.valid)
        {
        await userModel.updateMany({apiToken : apiKeyResult.value},{$set:{ loggedIn : false, apiToken : null}});
        
        return {
            status : true,
            message : "Logged Out"
        }
            
        }
        else
        {
            return {
                status : false,
                mesage : "Invalid Cookie"
            }
        }
    }
    catch(error)
    {
        return {
            status : false,
            message : JSON.stringify(error)
        }
    }
}

module.exports = logout;