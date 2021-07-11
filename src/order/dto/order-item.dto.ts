import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { Product } from "src/product/interfaces/product.interface";

export class OrderItemDto {

    @ApiProperty({
        example: "60d8b1716e3a6c0c0457ee0d",
        description: "The id of the product",
        format: "string"
    })
    @IsNotEmpty()
    readonly product: Product;

    @ApiProperty({
        example: "9.99",
        description: "The quantity of the product you want to order",
        format: "number",
        minimum: 1,
        default: 1
    })
    @IsNumber()
    @Min(1)
    readonly quantity: number;
}