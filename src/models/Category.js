const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categorySchema = new Schema(
{
  name: {
    type: String,
    required: true,
    unique: true,
  }
},
{
  collection: 'categories'
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}
);

module.exports = mongoose.model('Category', categorySchema);