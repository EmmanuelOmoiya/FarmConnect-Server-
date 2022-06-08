const mongoose = require('mongoose');

const productModel = mongoose.Schema({
    id: { type: String,  required: true},
    productName: { type: String, required: true },
    productQuantity: { type: String},
    productPrice: { type: String, required: true },
    productCategory: { type: String},
    productLocation: { type: String},
    productImg: { type: String },
    description: { type: String},
    farmName: { type: String},
    farmerName: { type: String}, 
    farmerImg: { type: String}
},
{
    timestamps: true
}
);

const Product = mongoose.model("Product", productModel);

module.exports = Product;