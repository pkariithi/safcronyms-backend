const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Role = require("../models/Role");

let userSchema = new Schema(
{
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: Role
    }
  ]
},
{
  collection: 'users'
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}
);

module.exports = mongoose.model('User', userSchema);