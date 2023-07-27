const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = require("../models/Category");

let acronymSchema = new Schema(
{
  acronym: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  definitions: [
    {
      meaning: {
        type: String,
        required: true,
      },
      examples: [
        {
          example: {
            type: String,
            required: false,
          }
        }
      ],
    }
  ],
  status: {
    type: String,
    required: true,
    default: "active"
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: Category
    }
  ]
},
{
  collection: 'acronyms'
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}
);

module.exports = mongoose.model('Acronym', acronymSchema);