import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsISO8601, IsOptional, IsString } from "class-validator";

export class CreateBucketlistDto {
    @ApiProperty({ type: 'string', description: '버킷리스트 내용' })
    @IsString()
    content: string;

    @ApiProperty({ type: Date, description: '날짜' })
    @IsISO8601()
    date: string;
}


