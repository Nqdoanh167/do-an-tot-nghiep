const express=require('express')
const router=express.Router()

router.use('/',require('./auth.router'))
router.use('/',require('./user.router'))

module.exports=router