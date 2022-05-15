"use strict";
const userService = require("../service/userService");
const respCode = require("../../../utils/response_code");
const respMsg = require("../../../utils/response_message");
const utilOperation = require("../../../utils/util_operation");
const config = require("../../../config/development");
const moment = require("moment-timezone");

const checkLoginCtrl = async (req, res) => {
  let requestBody = req.body;

  try {
    const validRequestBody = requestBody;

    let validUserData = await userService.getUserByEmail({
      userEmail: validRequestBody.userEmail,
    }); //validating new user with eixisting user

    if (
      validUserData != null &&
      validUserData.userEmail == validRequestBody.userEmail
    ) {
      const passwordMatch = await userService.encryptAndDecryptPassword(
        validRequestBody.userPassword,
        config.encryption.encryptionFlag.decrypt,
        validUserData.userPassword
      );
      if (passwordMatch) {
        return res.json({
          status: respCode.SUCCESS,
          message: respMsg[respCode.SUCCESS],
          body: validUserData,
        });
      } else {
        return res.json({
          status: respCode.UNAUTHORIZED_ACCESS,
          message: respMsg[respCode.UNAUTHORIZED_ACCESS],
          body: {},
        });
      }
    } else {
      return res.json({
        status: respCode.USER_NOT_FOUND,
        message: respMsg[respCode.USER_NOT_FOUND],
      });
    }
  } catch (err) {
    console.log("err ===", err);

    return res.json({
      status: respCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

module.exports = checkLoginCtrl;
