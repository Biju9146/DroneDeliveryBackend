"use strict";
const orderService = require("../service/orderService");
const respCode = require("../../../utils/response_code");
const respMsg = require("../../../utils/response_message");

const updateOrderStatusCtrl = async (req, res) => {
  let requestBody = req.body;

  try {
    const validRequestBody = requestBody;
    console.log("validRequestBody ++", validRequestBody);

      const orderStatus = await orderService.updateOrderStatus(validRequestBody);
      
      if (orderStatus) {
        return res.json({
          status: respCode.SUCCESS,
          message: respMsg[respCode.SUCCESS],
          body: "Successfully Updated!",
        });
      } else {
        return res.json({
          status: respCode.ORDER_NOT_FOUND,
          message: respMsg[respCode.ORDER_NOT_FOUND],
          body: "Order not found to update delivery status!",
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

module.exports = updateOrderStatusCtrl;
