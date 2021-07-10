import * as mongoose from 'mongoose';

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

exports.OrderItem = mongoose.model('OrderItem', OrderItemSchema);