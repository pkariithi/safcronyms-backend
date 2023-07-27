const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categorySchema = new Schema(
{
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true
  }
},
{
  collection: 'categories',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}
);
categorySchema.index({
  name: 'text',
  description: 'text'
});

module.exports = mongoose.model('Category', categorySchema);