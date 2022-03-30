import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUser{
    @IsNotEmpty()
    @ApiProperty()
    nome: string;   

    @IsNotEmpty()
    @ApiProperty()
    email: string;
}