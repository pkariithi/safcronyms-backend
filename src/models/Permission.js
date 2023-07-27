const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let permissionSchema = new Schema(
{
  name: {
    type: String,
    required: true,
    unique: true,
  }
},
{
  collection: 'permissions'
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}
);

module.exports = mongoose.model('Permission', permissionSchema);