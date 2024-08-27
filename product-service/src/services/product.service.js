'use strict'

const { AuthFailureError } = require("../core/error.response")
const { ProductModel } = require("../models")
const BaseRepo = require("../repositories/base.repo")

class ProductService{
  static async getAll(){
    let query={
      filter:{isDraft : false},
      page:1,
      limit:50,
      sort:'ctime',
    }
    return  BaseRepo.getAll(ProductModel,query)
  }

  static async getOne(idProduct){
    let query={
      filter:{_id: idProduct , isDraft : false},
    }
    return  BaseRepo.getOne(ProductModel,query)
  }
  
}

module.exports= ProductService