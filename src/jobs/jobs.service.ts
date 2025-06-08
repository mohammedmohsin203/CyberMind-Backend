import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { FilterJobDto } from './dto/filter-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    if (!createJobDto.minSalary && !createJobDto.maxSalary && createJobDto.salaryRange) {
      const [min, max] = createJobDto.salaryRange.split('-').map((s) => parseInt(s.trim(), 10));
      createJobDto.minSalary = min;
      createJobDto.maxSalary = max;
    }
    const job = this.jobsRepository.create(createJobDto);
    return this.jobsRepository.save(job);
  }

  async findAll(filter: FilterJobDto): Promise<Job[]> {
    const query = this.jobsRepository.createQueryBuilder('job');

    if (filter.jobTitle) {
      query.andWhere('job.jobTitle ILIKE :jobTitle', {
        jobTitle: `%${filter.jobTitle}%`,
      });
    }

    if (filter.location) {
      query.andWhere('job.location ILIKE :location', {
        location: `%${filter.location}%`,
      });
    }

    if (filter.jobType) {
      query.andWhere('job.jobType = :jobType', {
        jobType: filter.jobType,
      });
    }

    if (filter.minSalary) {
      query.andWhere('job.minSalary >= :minSalary', {
        minSalary: filter.minSalary,
      });
    }

    if (filter.maxSalary) {
      query.andWhere('job.maxSalary <= :maxSalary', {
        maxSalary: filter.maxSalary,
      });
    }

    return query.getMany();
  }

  async getFilterData(): Promise<{ jobTitles: string[]; locations: string[] }> {
    const jobs = await this.jobsRepository.find({
      select: ['jobTitle', 'location'],
    });

    const jobTitlesSet = new Set<string>();
    const locationsSet = new Set<string>();

    for (const job of jobs) {
      if (job.jobTitle) jobTitlesSet.add(job.jobTitle);
      if (job.location) locationsSet.add(job.location);
    }

    return {
      jobTitles: Array.from(jobTitlesSet),
      locations: Array.from(locationsSet),
    };
  }
}
