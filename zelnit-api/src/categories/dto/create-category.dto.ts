import {
    IsBoolean,
    IsOptional,
    IsString,
    Length
} from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @Length(2, 50)
    name!: string;

    @IsString()
    @Length(2, 50)
    slug!: string;

    @IsOptional()
    @IsString()
    icon?: string

    @IsOptional()
    @IsString()
    color?: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsBoolean()
    isActive?: boolean
}