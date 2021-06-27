import * as mongoose from 'mongoose';
import * as validator from 'validator';

export const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 255,
        required: true
    }, 
    description: {
        type: String,
        minLength: 10,
        maxLength: 1024,
        required: true
    },
    category: {
        type: String,
        minLength: 3,
        maxLength: 255,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0.01
    },
    quantity: {
        type: Number,
        required: false,
        default: 0,
        min: 0
    }
});