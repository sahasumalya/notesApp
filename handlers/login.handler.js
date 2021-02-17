const bcrypt = require('bcrypt');
const {userModel} = require('../models/user');
const generateApiToken = require('../modules/generateApiToken');
const {validateLogin} = require('../modules/validationInput');
const authenticate = require("../modules/authentication");

async function login(req,res)
{


    const validationResponse = validateLogin(req.body);
 
    if (validationResponse.error) {
      validationResponse.error.statusCode = 400;
      return validationResponse.error;
    }

    let authRes = authenticate(req);
    if(authRes.status)
    {
        return {
            status : "success",
            message : "user already logged in, logout to sign in with another account"
        }
    }
    let request_body = req.body;
    let email = request_body.email;
    let raw_password = request_body.password;
    try
    {
        let dbRes = await userModel.findOne({email:email},'loggedIn password');
        if(!dbRes)
            return {
                status : "failed",
                message : "user does not exist"
            }
        
        if(dbRes.loggedIn)
        {
            return {
                status : "success",
                message : "user already logged in"
            }
        }
        
        const match = await bcrypt.compare(raw_password, dbRes.password);
        if(match)
        {
            let apiToken = await generateApiToken();
            if(apiToken.status)
            {
                await userModel.updateOne({email:email},{$set:{apiToken:apiToken.value, loggedIn:true}});

                res.setCookie('apiKey', apiToken.value, {
                signed: true,
                path: '/'
                })
                .send({ status : "success",
                        message : "logged in" }
                    )
            }
            else
            {
                return { status : "failed",
                        message : "password wrong"
                    }
            }
        }
        else
        {
            return {
                status : "failed",
                message : "password wrong"
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

module.exports = login;