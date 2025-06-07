import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jobTitle: string;

  @Column()
  companyName: string;

  @Column()
  location: string;

  @Column()
  jobType: string; // Full-time, Part-time, Contract, Internship

  @Column()
  salaryRange: string;

  // @Column('text')
  // jobDescription: string;
  //
  // @Column('text')
  // requirements: string;

  @Column('text')
  responsibilities: string;

  @Column()
  applicationDeadline: Date;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  minSalary: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  maxSalary: number;
}
