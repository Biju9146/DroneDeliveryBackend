const UserMaster = require('../model/userModel');
const config = require('../../../config/development')
const moment = require('moment-timezone');
const bcrypt = require('bcrypt');
const utilOperation = require('../../../utils/util_operation');


let UserServiceClass = function () { };

UserServiceClass.prototype.getUserByEmail = async function(params) {
    return await UserMaster.findOne({
        where: params,
        raw: true
     });
}

UserServiceClass.prototype.userCreation = async function(params) {
      let dataToSave = {};
    let token = await utilOperation.tokenCreation(params.userEmail);

    if (params.userName) dataToSave.userName = params.userName;
    if (params.userPassword) dataToSave.userPassword = params.userPassword;
    if (params.userEmail) dataToSave.userEmail = params.userEmail;
    dataToSave.token = token;
    dataToSave.createdDate = new Date();
    dataToSave.modifiedDate = new Date();
    
    let userData = new UserMaster(dataToSave);
    return await userData.save();
}



UserServiceClass.prototype.encryptAndDecryptPassword = async function(params,flag,comparePassword){ 
    let callbackResult;     
    
    if(flag == config.encryption.encryptionFlag.encrypt) {

        return callbackResult =  await bcrypt.hashSync(params, config.encryption.saltRounds);

    } else if (flag == config.encryption.encryptionFlag.decrypt) {
                
        return callbackResult =  await bcrypt.compareSync(params, comparePassword)
    }
}



UserServiceClass.prototype.updateLastLoginAndHitCount = async function(params){
    console.log("params is++++++ ",params);
    let updateData = {};
    let token = await utilOperation.tokenCreation(params.email_id);


    if(params.user_hit_count || params.user_hit_count == 0) updateData.user_hit_count = params.user_hit_count += 1;
    updateData.token = token;
    updateData.user_login_auth = 0;
    updateData.last_login = moment().format('YYYY-MM-DD HH:mm:ss');
    updateData.modified_at =  moment().format('YYYY-MM-DD HH:mm:ss');

    console.log("updateData.modified_at ",updateData);
    
    return new Promise((resolve, reject) => {
        let that = this;
        UserMaster.update(updateData, {returning: true, where: { user_id:  params.user_id } })
            .then(function ([rowsUpdate,result]) {
                result == 1 ? resolve(that.getUserByEmail({email_id: params.email_id})) : reject(false);
            })
            .catch(function (err) {
                reject(err);
            });
        });  

}

UserServiceClass.prototype.updateNewPassword = async function(params){

    // encryptNewPassword = await this.encryptAndDecryptPassword(object.email_id);
    console.log("params +++",params);

    
    // params.user_password =  params.user_password;
    params.previous_password1 =  (params.user_password_initial === "0") ? params.user_password :  params.previous_password1;
    params.previous_password2 =  (params.user_password_initial === "1") ? params.user_password :  params.previous_password2;
    params.previous_password3 =  (params.user_password_initial === "2") ? params.user_password :  params.previous_password3;
    params.user_password_initial = ( params.user_password_initial === "0") ? "1" : ( params.user_password_initial === "1") ? "2" : "0";
    params.default_password = "F";
    params.last_login = moment().format();
    params.password_modified_at = moment().format();
    params.logout_time =  moment().format();
    params.modified_at =  moment().format();

    console.log("updation Object +++",params);

    return new Promise((resolve, reject) => {
        let that = this;
        UserMaster.update(params, {returning: true, where: { user_id:  params.user_id } })
            .then(function ([rowsUpdate,result]) {
                result == 1 ? resolve(that.getUserByEmail({email_id: params.email_id})) : reject(false);
            })
            .catch(function (err) {
                reject(err);
            });
        });  
}

UserServiceClass.prototype.updateUserAuthCount = async function(params){
    let updateData = {};

    if(params.user_login_auth || params.user_login_auth == 0) updateData.user_login_auth = params.user_login_auth += 1;
    if(params.user_login_auth > 5 ) updateData.is_locked = params.is_locked = 'T';
    updateData.modified_at =  moment().format();


    return new Promise((resolve, reject) => {
        let that = this;
        UserMaster.update(updateData, {where: { user_id:  params.user_id } })
            .then(function (result) {
                result == 1 ? resolve(that.getUserByEmail({email_id: params.email_id})) : reject(false);
            })
            .catch(function (err) {
                reject(err);
            });
        });  
}



module.exports = new UserServiceClass;