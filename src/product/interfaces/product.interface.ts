import { Document } from "mongoose";

export interface Product extends Document{
    name: string,
    description: string,
    category: string,
    price: number,
    quantity: number
}
