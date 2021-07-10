import { Product } from "src/product/interfaces/product.interface";

export class OrderItemDto {

    readonly product: Product;

    readonly quantity: number;
}