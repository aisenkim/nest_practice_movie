import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetMovieFilterDto {
  @IsOptional()
  @IsNotEmpty()
  readonly search: string;
}
