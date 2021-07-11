import * as mongoose from 'mongoose';
import * as validator from 'validator';
const Schema = mongoose.Schema;

export const OrderItemSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
});

const shippingSchema = {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  };

export const OrderSchema = new mongoose.Schema({
    orderItems: [OrderItemSchema],
    totalPrice: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    shipping: shippingSchema,
    status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    }
});

exports.Order = mongoose.model('Order', OrderSchema);