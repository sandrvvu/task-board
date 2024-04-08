import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksList } from './entities/list.entity';
import { Task } from 'src/tasks/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TasksList, Task])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
