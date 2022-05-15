const respCode = require('../utils/response_code');
const respMsg = require('../utils/response_message');
const utilOperation = require('../utils/util_operation');

function verifyToken (request, response, next) {

    try{

    
        // console.log("verify token request body ++++++++",request.body);
        console.log("verify token request headers['Authorization'] ++++++++",request.headers['authorization']);
    
    
        let methodType = request.method;
        var reqParams = {};
        if(methodType == 'GET') {
            reqParams = request.query;
            console.log("get Param",reqParams)
        } else {
            reqParams = request.body;
            console.log("post Param",reqParams)

        }
    
        reqParams.token =  request.query.authorization || request.headers['authorization'];
        if (typeof reqParams.token === "undefined" && reqParams.token === null) return response.json({
            status: respCode.INVALID_ACCESS_TOKEN,
            message: respMsg[respCode.INVALID_ACCESS_TOKEN]
        });    
       
            utilOperation.tokenVerification(reqParams.token).then(resp => {
                console.log("resp ++++++",resp);
                console.log("request.body",request.body);

                if(request.body.loginEmail == resp.id || request.query.loginEmail == resp.id) {              
                    request.body.loginEmail ? delete request.body.token : delete request.query.token;
                    next();
                } else {
                    return response.json({
                        status: respCode.INVALID_ACCESS_TOKEN,
                        message: respMsg[respCode.INVALID_ACCESS_TOKEN]
                    });
                }
            }).catch(err => {            
                console.log("error in catch block ",err);
                if(err.name == "TokenExpiredError"){
                    return  response.json({status: respCode.TOKEN_ALREADY_EXPIRED, message: respMsg[respCode.TOKEN_ALREADY_EXPIRED] });    
                }else {
                    return  response.json({status: respCode.INTERNAL_SERVER_ERROR, message: err.message });    
                } 
            });
    }catch(err){
        return  response.json({status: respCode.INTERNAL_SERVER_ERROR, message: err.message });    
    }
}

module.exports = verifyToken;