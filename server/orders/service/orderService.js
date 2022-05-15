const OrderMaster = require('../model/orderModel');
const config = require('../../../config/development')
const moment = require('moment-timezone');
const bcrypt = require('bcrypt');
const utilOperation = require('../../../utils/util_operation');


let OrderServiceClass = function () { };


OrderServiceClass.prototype.createDeliveryOrder = async function(params) {
    let dataToSave = {};
    console.log("Order Params +++ ",params)
  if (params.username) dataToSave.username = params.username;
  if (params.userEmail) dataToSave.userEmail = params.userEmail;
  if (params.userMobile) dataToSave.userMobile = params.userMobile;
  if (params.userAddress) dataToSave.userAddress = params.userAddress;
  if (params.recepientName) dataToSave.recepientName = params.recepientName;
  if (params.recepientEmail) dataToSave.recepientEmail = params.recepientEmail;
  if (params.recepientContact) dataToSave.recepientContact = params.recepientContact;
  if (params.recepientAddress) dataToSave.recepientAddress = params.recepientAddress;
  if (params.recepientLatLng) dataToSave.recepientLatLng = params.recepientLatLng;
  if (params.typeofParcel) dataToSave.typeofParcel = params.typeofParcel;
  if (params.parcelWeight) dataToSave.parcelWeight = params.parcelWeight;
  if (params.deliveryFlag) dataToSave.deliveryFlag = params.deliveryFlag;

  dataToSave.createdDate = new Date();
  dataToSave.modifiedDate = new Date();
  
  let userData = new OrderMaster(dataToSave);
  return await userData.save();
}

OrderServiceClass.prototype.getAllDeliveryData = async function(params) {
    console.log("Order Params +++ ",params)
    return await OrderMaster.findAll({
        raw : true
    })
}

OrderServiceClass.prototype.updateOrderStatus = async function(params){
    
    console.log("params is ",params);
        
    let updateData = {};
    if (params.deliveryFlag) updateData.deliveryFlag = params.deliveryFlag;

    return await new Promise((resolve, reject) => {
        // let that = this;
        OrderMaster.update(updateData, {returning: true, where: {
                id : params.id
            } })
            .then(function ([rowsUpdate,result]) {
                console.log("updateData -------->",result);

                result == 1 ? resolve(true) : reject(false);
            })
            .catch(function (err) {
                reject(err);
            });
        });

}

module.exports = new OrderServiceClass;
