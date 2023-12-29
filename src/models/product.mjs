import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String, required: false },
  description: { type: String,required: false },
  price: { type: Number, required: false },
  amount: { type: Number, required: false }
}, { timestamps: true } );

const product = mongoose.model('product', productSchema, 'products');

export default product;
