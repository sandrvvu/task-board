import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { CreateTasksListDto } from './dto/create-list.dto';
import { UpdateTasksListDto } from './dto/update-list.dto';
import { TasksList } from './entities/list.entity';

@Controller('/')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // List Routes
  @Post('lists')
  createList(
    @Body() createTasksListDto: CreateTasksListDto,
  ): Promise<TasksList> {
    return this.tasksService.createList(createTasksListDto);
  }

  @Patch('lists/:listId')
  editListName(
    @Param('listId') listId: string,
    @Body() updateTasksListDto: UpdateTasksListDto,
  ): Promise<TasksList> {
    return this.tasksService.editListName(listId, updateTasksListDto);
  }

  @Get('lists')
  findAllLists(): Promise<TasksList[]> {
    return this.tasksService.findAllLists();
  }

  @Get('lists/:listId')
  findListById(@Param('listId') listId: string): Promise<TasksList> {
    return this.tasksService.findListById(listId);
  }

  @Delete('lists/:listId')
  removeList(@Param('listId') listId: string): Promise<void> {
    return this.tasksService.removeList(listId);
  }

  // Task Routes
  @Get('/tasks/:taskId')
  getTaskById(@Param('taskId') taskId: string): Promise<Task> {
    return this.tasksService.getTaskById(taskId);
  }

  @Post('lists/:listId/tasks')
  addTask(
    @Body() createTaskDto: CreateTaskDto,
    @Param('listId') taskListId: string,
  ): Promise<Task> {
    return this.tasksService.addTask(createTaskDto, taskListId);
  }

  @Delete('/tasks/:taskId')
  async removeTask(@Param('taskId') taskId: string): Promise<void> {
    await this.tasksService.removeTask(taskId);
  }

  @Put('/tasks/:taskId')
  async editTask(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.editTask(updateTaskDto, taskId);
  }

  @Patch('/tasks/:taskId/move/:newTaskListId')
  async moveTaskToAnotherList(
    @Param('taskId') taskId: string,
    @Param('newTaskListId') newTaskListId: string,
  ): Promise<Task> {
    return this.tasksService.moveTaskToList(taskId, newTaskListId);
  }
}
