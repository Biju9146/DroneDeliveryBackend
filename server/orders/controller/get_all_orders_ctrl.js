"use strict";
const orderService = require("../service/orderService");
const respCode = require("../../../utils/response_code");
const respMsg = require("../../../utils/response_message");

const getAllOrderCtrl = async (req, res) => {
  let requestBody = req.body;

  try {
    const validRequestBody = requestBody;
    console.log("validRequestBody ++", validRequestBody);

      const getOrderData = await orderService.getAllDeliveryData(validRequestBody);
      
      if (getOrderData) {
        return res.json({
          status: respCode.SUCCESS,
          message: respMsg[respCode.SUCCESS],
          body: getOrderData,
        });
      } else {
        return res.json({
          status: respCode.ORDER_NOT_FOUND,
          message: respMsg[respCode.ORDER_NOT_FOUND],
          body: "Order not found for delivery!",
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

module.exports = getAllOrderCtrl;
