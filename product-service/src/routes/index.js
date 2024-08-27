const express=require('express')
const router=express.Router()

router.use('/',require('./product.router'))

module.exports=router