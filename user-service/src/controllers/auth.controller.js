'use strict'

const { CREATED, OK, SuccessResponse } = require("../core/success.response");
const { AuthService } = require("../services");

class AuthController{
  static async Register(req, res, next)  {
    new CREATED({
      message: 'Register successfully',
      metadata: await AuthService.Register(req.body,res),
    }).send(res);
  };
  static async Login(req, res, next)  {
    new OK({
      message: 'Login successfully',
      metadata: await AuthService.Login(req.body,res),
    }).send(res);
  };
  static async Logout(req, res, next)  {
    new OK({
      message: 'Logout successfully',
      metadata: await AuthService.Logout(res),
    }).send(res);
  };
}
module.exports=AuthController