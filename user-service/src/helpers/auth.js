/** @format */

'use strict';
const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const UserModel = require('../models/user.model');
const { AuthFailureError } = require('../core/error.response');


const authentication = asyncHandler(async (req, res, next) => {
  let token;
   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
   } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
   }

   if (!token) {
      throw new AuthFailureError('You are not logging in! Please log in to get access');
   }

   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   const freshUser = await UserModel.findById(decoded.id);
   if (!freshUser) {
      throw new AuthFailureError('The user belonging to this token does no longer exist');
   }
   req.user = freshUser;
   next();
});

// restrict access
const restrictTo = (...roles) => {
   return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
         throw new AuthFailureError('You do not have permission to perform this action');
      }
      next();
   };
};

module.exports = {
   authentication,
   restrictTo
};
