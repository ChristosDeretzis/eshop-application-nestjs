import { Document } from "mongoose";
import { Product } from "src/product/interfaces/product.interface";

export interface orderProducts extends Document{
    product: Product,
    quantity: number
}