const express=require('express')
const router=express.Router()
const asyncHandler =require('../helpers/asyncHandler')
const { authentication,restrictTo  } = require('../helpers/auth');
const { ProductController } = require('../controllers');
const upload = require('../helpers/upload');


// //authentication
router.use(authentication);

router.get('/', asyncHandler(ProductController.getAll));
router.get('/:id', asyncHandler(ProductController.getOne));


//crud user by admin
// router.use(restrictTo('admin'));

// router
//    .route('/')
//    .get(UserController.getAllUser)
   
// // router
// //    .route('/:id')
// //    .get(userController.getUser)
// //    .delete(userController.deleteUser);

module.exports=router 