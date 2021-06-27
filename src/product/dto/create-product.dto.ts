import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateProductDto {

    @ApiProperty({
        example: "iPhone 12",
        description: "The name of the product",
        format: "string",
        minLength: 3,
        maxLength: 255
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    readonly name: string;

    @ApiProperty({
        description: "The description of the product",
        format: "string",
        minLength: 10,
        maxLength: 1024
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @MaxLength(1024)
    readonly description: string;

    @ApiProperty({
        example: "Electronic goods",
        description: "The category of the product",
        format: "string",
        minLength: 3,
        maxLength: 255
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    readonly category: string;

    @ApiProperty({
        example: "9.99",
        description: "The price of the product",
        format: "number",
        minimum: 0.01
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(0.01)
    readonly price: number;

    @ApiProperty({
        example: "9.99",
        description: "The available quantity of the product",
        format: "number",
        minimum: 0,
        default: 0
    })
    @IsNumber()
    @Min(0)
    readonly quantity: number;
}
