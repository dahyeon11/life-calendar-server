import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    id: string

    @IsString()
    password: string

    @IsString()
    @IsOptional()
    name: string
}
