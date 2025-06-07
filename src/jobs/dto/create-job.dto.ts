import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsEnum,
  IsOptional,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum JobType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  INTERNSHIP = 'Internship',
}

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  jobTitle: string;

  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsEnum(JobType)
  jobType: JobType;

  @IsNotEmpty()
  @IsString()
  salaryRange: string;

  // @IsNotEmpty()
  // @IsString()
  // jobDescription: string;
  //
  // @IsNotEmpty()
  // @IsString()
  // requirements: string;

  @IsNotEmpty()
  @IsString()
  responsibilities: string;

  @IsNotEmpty()
  @IsDateString()
  applicationDeadline: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  minSalary?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  maxSalary?: number;
}
