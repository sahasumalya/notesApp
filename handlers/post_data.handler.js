
const authenticate = require("../modules/authentication");
const {notesModel} = require("../models/notes");
const {validatePostInput} = require("../modules/validationInput");
async function post(req,res)
{

    const validationResponse = validatePostInput(req.body);
 
    if (validationResponse.error) {
      validationResponse.error.statusCode = 400;
      return validationResponse.error;
    }
   try
   {
        let authRes = await authenticate(req);
        if(authRes.status)
        {
            let requestBody = req.body;
            let title = requestBody.title;
            let description = requestBody.description;
            let userId = authRes.userId._id;

            const dbObject = {
                userId : userId,
                notes : {title : title,
                        description : description}

            }

            await notesModel.insertMany([dbObject]);

            return {
                status : "success",
                message : "succesfully posted"
            }
        
        }
        else
        {
            return {
                status : "failed",
                message : authRes.message
            }
        }  
    }
    catch(error)
    {
        return {
            status : "failed",
            message : JSON.stringify(error)
        }
    }
    
}

module.exports = post;