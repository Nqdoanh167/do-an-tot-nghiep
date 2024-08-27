'use strict'

const { OK } = require("../core/success.response")
const { ProductService } = require("../services")

class ProductController{
  static async getAll(req,res,next){
    new OK({
      message: 'Get all products successfully',
      metadata: await ProductService.getAll(),
    }).send(res)
  }

  static async getOne(req,res,next){
    new OK({
      message: 'Get product by id successfully',
      metadata: await ProductService.getOne(req.params.id),
    }).send(res)
  }
}

module.exports=ProductController