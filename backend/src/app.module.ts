import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { USERNAME, PASSWORD, DATABASE } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: USERNAME,
      password: PASSWORD,
      database: DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TasksModule,
  ],
})
export class AppModule {}
