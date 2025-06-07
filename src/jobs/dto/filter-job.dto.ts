import { IsOptional, IsString, IsEnum, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { JobType } from './create-job.dto';

export class FilterJobDto {
  @IsOptional()
  @IsString()
  jobTitle?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEnum(JobType)
  jobType?: JobType;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  minSalary?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  maxSalary?: number;
}
