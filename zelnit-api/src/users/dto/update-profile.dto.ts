import { IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    @Length(3, 30)
    username?: string;

    @IsOptional()
    @IsUrl()
    avatarUrl?: string;

    @IsOptional()
    @IsString()
    @Length(2, 2)
    countryCode?: string;

    @IsOptional()
    @IsString()
    @Length(2, 5)
    language?: string;
}