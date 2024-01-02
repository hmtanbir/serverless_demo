import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },  
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true }],
  totalAmount: { type: Number, required: true },
  status: {
    type: ['pending', 'completed', 'failed', 'delivered', 'canceled'],
    default: 'pending',
    required: false
  }
}, { timestamps: true } );

const order = mongoose.model('order', orderSchema, 'orders');

export default order;
