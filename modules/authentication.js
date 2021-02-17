const {userModel} = require("../models/user");

async function authenticate(req)
{
    const apiKeyResult = req.unsignCookie(req.cookies.apiKey);
    try{
        if(apiKeyResult.valid)
        {
        let userId =  await userModel.findOne({loggedIn:true, apiToken : apiKeyResult.value},'_id');
        if(userId)
            return {
                status : true,
                userId : userId
            }
            else
            {
                return {
                    status : false,
                    message : "Not logged in"
                }
            }
        }
        else
        {
            return {
                status : false,
                mesage : "Not logged in"
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

module.exports = authenticate;