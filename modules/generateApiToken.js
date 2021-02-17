const {userModel} = require("../models/user");
const Guid = require("guid");


async function generateApiToken()
{
    try
    {
        let apiToken = Guid.create().value;
        let dbRes = await userModel.findOne({apiToken: apiToken});
        if(!dbRes)
            return {
                status : true,
                value : apiToken
            }
        else
            {
               let res =  await generateApiToken();
               return res;
            }

    }
    catch(error)
    {
        return{
            status : false,
            message : "Cant generate ApiToken for "+error
        }
    }

}

module.exports = generateApiToken;
