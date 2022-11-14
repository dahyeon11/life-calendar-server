import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsISO8601, IsOptional, IsString } from "class-validator";


export class CreateTodoDto {
    @ApiProperty({ type: 'string', description: '일정 제목' })
    @IsString()
    title: string;

    @ApiProperty({ type: 'string', description: '일정 내용' })
    @IsString()
    content: string;

    @ApiProperty({ type: Date, description: '예약 날짜' })
    @IsISO8601()
    reservation: string;
}

