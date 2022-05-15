const jwt = require('jsonwebtoken');
const config = require('../config/development')


let genericOperation = function () { };    


genericOperation.prototype.tokenCreation = async (params) => {
    // {
    //     expiresIn : config.session.expiredAt
    //   }
    var token = jwt.sign({ id: params, expiresIn : config.session.expiredAt }, config.session.secretKey);  
    return token;
}

genericOperation.prototype.tokenVerification = function (params) {
    console.log("utilts token params ",params)
      return new Promise((resolve,reject) => {
          jwt.verify(params, config.session.secretKey, function(err, decoded) {
            
            console.log("utilts token err ", err)
            console.log("utilts token decoded ", decoded)

              if (err) {
                  return reject(err);               
              }
              return resolve(decoded);
            }); 
         
    });
  
}

genericOperation.prototype.JoiErrorMsg = (validationError) => {
    return validationError.details.map(d => d.message.replace(`\"`, " ").replace(`\"`, " "));
};

genericOperation.prototype.randomString = function (length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
    return result;

    // document.write(randomString(16, 'aA'));
    // document.write(randomString(32, '#aA'));
    // document.write(randomString(64, '#A!'));
}

module.exports = new genericOperation();
