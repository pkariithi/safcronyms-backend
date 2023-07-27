const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Permission = require("./Permission");

let roleSchema = new Schema(
{
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: Permission
    }
  ]
},
{
  collection: 'roles',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}
);
roleSchema.index({
  name: 'text',
  description: 'text'
});

module.exports = mongoose.model('Role', roleSchema);