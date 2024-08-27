const mongoose = require('mongoose'); // Erase if already required
const Schema = mongoose.Schema; // Erase if already required
const DOCUMENT_NAME = 'Product'; // Model name
const COLLECTION_NAME = 'products';


// Declare the Schema of the Mongo model
var productSchema = new Schema(
   {
      title: {
         type: String,
         required: true,
      },
      slug: {
         type: String,
      },
      description: {
         type: String,
      },
      quantity_sold: {
         type: Number,
         required: true,
      },
      averageRating: {
         type: Number,
         default: 4.5,
         min: [1, 'Rating must be at least 1.0'],
         max: [5, 'Rating must can not be more than 5.0'],
         set: (val) => Math.round(val * 10) / 10,
      },
      brand: {
         type: String,
         required: true,
      },
      category: {
         type: String,
         required: true,
      },
      image: {
         type: String,
         required: true,
      },
      thumbnail: [
         {
            type: String,
         },
      ],
      isDraft: {
         type: Boolean,
         default: true,
         select: false,
      },
   },
   {
      timestamps: true,
      collection: COLLECTION_NAME,
   },
);

//Export the model
const ProductModel= mongoose.model(DOCUMENT_NAME, productSchema);
module.exports = ProductModel
