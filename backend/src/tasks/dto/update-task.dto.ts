import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { TaskPriority } from '../task.enum';

export class UpdateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsOptional()
  dueDate?: Date;
}
