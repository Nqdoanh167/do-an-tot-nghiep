const express=require('express')
const router=express.Router()
const asyncHandler =require('../helpers/asyncHandler')
const { authentication,restrictTo  } = require('../helpers/auth');
const { UserController } = require('../controllers');
const upload = require('../helpers/upload');

// //authentication
router.use(authentication);

//crud user by me
// router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', asyncHandler(UserController.getMe));
router.patch('/updateMe', upload.single('avatar'),UserController.updateMe);
router.patch('/deleteMe', UserController.deleteMe);

//crud user by admin
router.use(restrictTo('admin'));

router
   .route('/')
   .get(UserController.getAllUser)
   
// router
//    .route('/:id')
//    .get(userController.getUser)
//    .delete(userController.deleteUser);

module.exports=router 