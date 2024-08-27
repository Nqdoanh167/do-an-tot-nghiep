'use strict'

const { OK } = require("../core/success.response")
const { UserService } = require("../services")

class UserController{
  static async getMe(req,res,next){
    new OK({
      message: 'Get me successfully',
      metadata: await UserService.getMe(req.user.id),
    }).send(res)
  }

  static async updateMe(req,res,next){
    new OK({
      message: 'Update me successfully',
      metadata: await UserService.updateMe(req.user.id,req.body,req.file),
    }).send(res)
  }

  static async deleteMe(req,res,next){
    new OK({
      message: 'Delete me successfully',
      metadata: await UserService.deleteMe(req.user.id),
    }).send(res)
  }

  static async getAllUser(req,res,next){
    new OK({
      message: 'Get all user successfully',
      metadata: await UserService.getAllUser(),
    }).send(res)
  }
}

module.exports=UserController