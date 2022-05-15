"use strict";
const orderService = require("../service/orderService");
const respCode = require("../../../utils/response_code");
const respMsg = require("../../../utils/response_message");

const placeOrderCtrl = async (req, res) => {
  let requestBody = req.body;

  try {
    const validRequestBody = requestBody;
    console.log("validRequestBody ++", validRequestBody);

      const orderCreated = await orderService.createDeliveryOrder(validRequestBody);
      if (orderCreated) {
        return res.json({
          status: respCode.SUCCESS,
          message: respMsg[respCode.SUCCESS],
          body: {},
        });
      } else {
        return res.json({
          status: respCode.BAD_REQUEST,
          message: respMsg[respCode.BAD_REQUEST],
          body: "Order not created somting wrong!, Please contact Administrator.",
        });
      }
    }  catch (err) {
    console.log("err ===", err);

    return res.json({
      status: respCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

module.exports = placeOrderCtrl;
