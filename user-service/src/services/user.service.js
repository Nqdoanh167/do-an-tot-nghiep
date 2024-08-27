'use strict'

const { AuthFailureError } = require("../core/error.response")
const { UserModel } = require("../models")
const BaseRepo = require("../repositories/base.repo")

class UserService{
  static async getMe(idUser){
    let query={
      filter:{_id:idUser},
      unSelect:['password','__v']
    }
    const existUser=await BaseRepo.getOne(UserModel,query.filter)
    if (!existUser) {
      throw new AuthFailureError('User not found');
    }
    return  BaseRepo.getOne(UserModel,query)
  }
  
  static async updateMe(idUser,data,avatar){
    let query={
      filter:{_id:idUser},
      unSelect:['password','__v']
    }
    const existUser=await BaseRepo.getOne(UserModel,query.filter)
    if (!existUser) {
      throw new AuthFailureError('User not found');
    }
    const {first_name, last_name, email, date_of_birth, telephoneNumber, address}=data
    let dataUpdate={
      first_name,
      last_name,
      email,
      date_of_birth,
      telephoneNumber,
      address
    }
    if (avatar) {
      dataUpdate.avatar = avatar.path;
    }
    return BaseRepo.updateOne(UserModel,query,dataUpdate)
  }

  static async deleteMe(idUser){
    let query={
      filter:{_id:idUser}
    }
    const existUser=await BaseRepo.getOne(UserModel,query.filter)
    if (!existUser) {
      throw new AuthFailureError('User not found');
    }
    await BaseRepo.updateOne(UserModel, query, { isDeleted: true })
    return null
  }


  static async getAllUser(){
    let query={
      filterCount:{role: 'user'},
      filter:{role: 'user'},
      select:['_id','email']
    }
    return BaseRepo.getAll(UserModel,query)
  }
}

module.exports= UserService