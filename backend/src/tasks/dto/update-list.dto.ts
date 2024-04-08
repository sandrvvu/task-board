import { IsNotEmpty } from 'class-validator';

export class UpdateTasksListDto {
  @IsNotEmpty()
  name: string;
}
