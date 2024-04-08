import { IsNotEmpty } from 'class-validator';

export class CreateTasksListDto {
  @IsNotEmpty()
  name: string;
}
