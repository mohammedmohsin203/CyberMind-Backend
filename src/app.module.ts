import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-d12h54p5pdvs73cnvu20-a',
      port: 5432,
      username: 'job_nl84_user', 
      password: 'QhJ8yJUsCtlbRvp8WctsKSE395UBiInt',
      database: 'job_nl84',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false, // 🔐 Accept Render's self-signed cert
        },
      },
    }),
    JobsModule,
  ],
})
export class AppModule {}
