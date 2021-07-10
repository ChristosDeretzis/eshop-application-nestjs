import { Document } from "mongoose";
import { Product } from "src/product/interfaces/product.interface";

export interface OrderItem extends Document{
    product: Product,
    quantity: number
}