const express=require('express')
const router=express.Router()
const asyncHandler =require('../helpers/asyncHandler')
const {AuthController}=require('../controllers')
const { authentication } = require('../helpers/auth')


router.post('/register',asyncHandler(AuthController.Register))
router.post('/login',asyncHandler(AuthController.Login))

// //authentication
router.use(authentication);
//
router.post('/logout',asyncHandler(AuthController.Logout))



module.exports=router 