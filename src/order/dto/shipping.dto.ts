import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class ShippingDto {

    @ApiProperty({
        example: "Chrysostomou Smyrnis 61",
        description: "The address of the client",
        format: "string",
        minLength: 5,
        maxLength: 1024
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(1024)
    readonly address: string;

    @ApiProperty({
        example: "sindos",
        description: "The city of the client",
        format: "string",
        minLength: 3,
        maxLength: 1024
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(1024)
    readonly city: string;

    @ApiProperty({
        example: "57 400",
        description: "The post code of the client",
        format: "string",
        minLength: 3,
        maxLength: 20
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    readonly postalCode: string;

    @ApiProperty({
        example: "Greece",
        description: "The country of the client",
        format: "string",
        minLength: 3,
        maxLength: 100
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    readonly country: string;
}