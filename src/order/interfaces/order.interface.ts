import { Document } from "mongoose";
import { User } from "src/user/interfaces/user.interface";
import { orderProducts } from "./order-item.interface";

export interface Order extends Document{
    user: User,
    products: [orderProducts],
    finalize: boolean,
    createDate: Date
}

