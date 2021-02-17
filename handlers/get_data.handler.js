const {notesModel} = require("../models/notes");
const options = require("../config/config");
const authentication = require("../modules/authentication");
const {validateGetInput} = require("../modules/validationInput");

async function getNotes(req,res)
{
    const validationResponse = validateGetInput(req.body);
 
    if (validationResponse.error) {
      validationResponse.error.statusCode = 400;
      return validationResponse.error;
    }
    try
    {
        page = req.body.page;
        limit = req.body.limit;
        authRes = await authentication(req);
        console.log(authRes);
        if(authRes.status)
        {
            let result = {};
            if(!page)
            page = parseInt(options.page);

            if(!limit)
            limit = parseInt(options.limit);

            const fetchOptions = {
                skip: limit*(page-1),
                limit: limit,
            };
            const dbFilter = {
                userId : authRes.userId._id
            }
            if(req.body.title)
            {
                dbFilter["notes.title"] = req.body.title;
            }
            console.log(dbFilter);

            let totalRecord = await notesModel.countDocuments(dbFilter);
            if(totalRecord>0)
            {
                let dbRes = await notesModel.find(dbFilter, 'notes', fetchOptions);
                dbRes = dbRes.map((r)=>r.notes);
                let totalPages = parseInt(totalRecord/fetchOptions.limit);
                if(totalRecord%fetchOptions.limit!=0)
                    totalPages++;

                result = {
                    status : "success",
                    data : {
                        totalRecords : totalRecord,
                        totalPages : totalPages,
                        page : page,
                        limit : limit,
                        results : dbRes

                    }

                }

                
            }
            else
            {
                result = {
                    status : "success",
                    data : {
                        totalRecords : 0,
                        totalPages : 0,
                        page : page,
                        limit : limit,
                        results : []

                    }

                }
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

module.exports = getNotes;