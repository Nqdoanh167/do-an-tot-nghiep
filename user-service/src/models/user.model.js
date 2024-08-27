const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    date_joined: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    date_of_birth: Date,
    telephoneNumber: String,
    avatar: String,
    address: {
      type: String
    }, 
    role: {
      type: String,
      enum: ['user','admin'],
      default: 'user'
    } ,
    isDeleted: {
      type: Boolean,
      default: false
    }
},{
    timestamps: true
});

userSchema.pre(/^find/, async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
