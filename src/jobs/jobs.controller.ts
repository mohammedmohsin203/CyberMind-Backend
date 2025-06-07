import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException, Query, Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';

import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import {FilterJobDto} from "./dto/filter-job.dto";

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: Record<string, any>,
  ) {
    if (body.minSalary !== undefined) {
      body.minSalary = parseInt(body.minSalary, 10);
      if (isNaN(body.minSalary)) {
        throw new BadRequestException('minSalary must be a valid number');
      }
    }

    if (body.maxSalary !== undefined) {
      body.maxSalary = parseInt(body.maxSalary, 10);
      if (isNaN(body.maxSalary)) {
        throw new BadRequestException('maxSalary must be a valid number');
      }
    }

    const imageUrl = file ? `/uploads/${file.filename}` : undefined;

    const dtoObject = plainToInstance(
      CreateJobDto,
      { ...body, imageUrl },
      { enableImplicitConversion: true },
    );

    try {
      await validateOrReject(dtoObject);
    } catch (errors) {
      const messages = (errors as ValidationError[])
        .map((err) => Object.values(err.constraints || {}).join(', '))
        .join('; ');
      throw new BadRequestException(messages);
    }

    return this.jobsService.create(dtoObject);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Get()
  async findAll(@Query() filter: FilterJobDto) {
    return this.jobsService.findAll(filter);
  }
}
