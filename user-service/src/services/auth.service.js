/** @format */

'use strict';
const { BadRequestError, AuthFailureError } = require('../core/error.response');
const {UserModel} = require('../models');
const bcrypt = require('bcrypt');
const { getInfoData } = require('../utils');
const jwt = require('jsonwebtoken');

class AuthService {

   static async signToken(id) {
      return jwt.sign({id}, process.env.JWT_SECRET, {
         expiresIn: process.env.JWT_EXPIRES_IN,
      });
   }
   // Generate token
   static async generateToken(user, res) {
      const token = await this.signToken(user._id);
      const cookieOptions = {
         expiresIn: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
         // httpOnly: true,
      };
      res.cookie('jwt', token, cookieOptions);
      return {
         token,
         data: getInfoData({
            fields: ['_id', 'email'],
            object: user,
         }),
      };
   }
   // Register
   static async Register({email, password}, res) {
      //step1: check email exists
      const existUser = await UserModel.findOne({email}).lean();
      if (existUser) {
         throw new BadRequestError('Error: User already registerd!');
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await UserModel.create({
         email,
         password: passwordHash,
      });
      return await this.generateToken(newUser, res);
   }

   //  Login
   static async Login({email, password}, res) {
      // 1
      const existUser = await UserModel.findOne({email});
      if (!existUser) {
         throw new AuthFailureError('Authentication error');
      }

      // 2
      const match = await bcrypt.compare(password, existUser.password);
      if (!match) {
         throw new AuthFailureError('Authentication error');
      }
      return await this.generateToken(existUser, res);
   }

   static async Logout(res) {
      res.clearCookie('jwt');
      return null;
   }
}
module.exports = AuthService;
