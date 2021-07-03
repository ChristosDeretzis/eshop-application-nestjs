import * as mongoose from 'mongoose';
import * as validator from 'validator';
const Schema = mongoose.Schema;

export const OrderSchema = new mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required:true
    }],
    totalPrice: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    }
});

exports.Order = mongoose.model('Order', OrderSchema);