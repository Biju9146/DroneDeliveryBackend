'use strict';
const respCode = require('../../../utils/response_code');
const respMsg = require('../../../utils/response_message');
const utilOperation = require('../../../utils/util_operation');
const userService = require('../service/userService');
const config = require('../../../config/development')


const userRegistrationCtrl = async (req, res)=>{
    let requestBody = req.body;

    try {
        const  validRequestBody = requestBody;
        console.log("validRequestBody ++",validRequestBody);
        
        let validatingNewUser = await userService.getUserByEmail({userEmail : validRequestBody.userEmail}) //validating new user with eixisting user
        console.log("validatingNewUser ++",validatingNewUser);
        if(validatingNewUser != null) {            
            return res.json({status: respCode.USER_EMAIL_ALREADY_EXIST, message: respMsg[respCode.USER_EMAIL_ALREADY_EXIST]})
        } 
        const hasPassword = await userService.encryptAndDecryptPassword(validRequestBody.userPassword, config.encryption.encryptionFlag.encrypt); 
        validRequestBody.userPassword = hasPassword;
       
        let newRegisteredUser = await userService.userCreation(validRequestBody) // creating new user 
        if(newRegisteredUser != null){
            return res.json({ status: respCode.SUCCESS, message: respMsg[respCode.SUCCESS], body: "User is created "+ {user_id : newRegisteredUser.userEmail}});
        } else {            
            return res.json({ status: respCode.USER_CREATION_INVALID, message: respMsg[respCode.USER_CREATION_INVALID] });
        }
    }
    catch (err) { 
        console.log("err ===",err);        
            return res.json({ status: respCode.INTERNAL_SERVER_ERROR, message: err.message });
    }
}

module.exports = userRegistrationCtrl;