const {notesModel} = require("../models/notes");
const options = require("../config/config");
const authentication = require("../modules/authentication");
const {validateDeleteInput} = require("../modules/validationInput")

async function updateNotes(req,res)
{

  const validationResponse = validateDeleteInput(req.body);
 
  if (validationResponse.error) {
    validationResponse.error.statusCode = 400;
    return validationResponse.error;
  }
    try
    {
        authRes = await authentication(req);
        console.log(authRes);
        if(authRes.status)
        {
            let result = {};
            
            const dbFilter = {
                userId : authRes.userId._id,
            }
            
            dbFilter["notes.title"] = req.body.title;
            
            console.log(dbFilter);

           
            let dbRes = await notesModel.deleteMany(dbFilter, {$set:{'notes.description': req.body.description}});
            console.log(dbRes);
            let deleteCount = dbRes.deletedCount || 0;
            
            result = {
                status : "success",
                deletedCount : deleteCount,

            }

                
            
            
            return result;

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

module.exports = updateNotes;