const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Permission = require("../models/Permission");

let roleSchema = new Schema(
{
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: Permission
    }
  ]
},
{
  collection: 'roles'
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}
);

module.exports = mongoose.model('Role', roleSchema);