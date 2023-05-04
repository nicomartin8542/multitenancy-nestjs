import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTenancyDto {
  @IsString()
  @MaxLength(30)
  @MinLength(3)
  name: string;
}
