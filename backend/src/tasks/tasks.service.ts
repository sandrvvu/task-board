import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { CreateTasksListDto } from './dto/create-list.dto';
import { UpdateTasksListDto } from './dto/update-list.dto';
import { TasksList } from './entities/list.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksList)
    private readonly tasksListRepository: Repository<TasksList>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createList(createTasksListDto: CreateTasksListDto): Promise<TasksList> {
    const { name } = createTasksListDto;
    const list = this.tasksListRepository.create({
      name,
      tasks: [],
    });

    await this.tasksListRepository.save(list);

    return list;
  }

  async editListName(
    listId: string,
    updateTasksListDto: UpdateTasksListDto,
  ): Promise<TasksList> {
    const { name } = updateTasksListDto;
    const list = await this.findListById(listId);

    list.name = name;
    await this.tasksListRepository.save(list);

    return list;
  }

  async findAllLists(): Promise<TasksList[]> {
    return this.tasksListRepository.find({ relations: ['tasks'] });
  }

  async findListById(listId: string): Promise<TasksList> {
    const found = await this.tasksListRepository.findOne({
      where: { id: listId },
      relations: ['tasks'],
    });

    if (!found) {
      throw new NotFoundException(`List with ID '${listId}' not found`);
    }

    return found;
  }

  async removeList(listId: string): Promise<void> {
    const result = await this.tasksListRepository.delete(listId);

    if (result.affected === 0) {
      throw new NotFoundException(`List with ID '${listId}' not found`);
    }
  }

  //Task
  async getTaskById(taskId: string): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
      relations: ['taskList'],
    });

    if (!found) {
      throw new NotFoundException(`Task with ID '${taskId}' not found`);
    }
    return found;
  }

  async addTask(createTaskDto: CreateTaskDto, listId: string): Promise<Task> {
    const { title, description, priority, dueDate } = createTaskDto;

    const taskList = await this.findListById(listId);

    const newTask = this.taskRepository.create({
      title,
      description: description || null,
      dueDate: dueDate || null,
      priority,
      taskList,
    });

    taskList.tasks.push(newTask);

    await this.tasksListRepository.save(taskList);

    return newTask;
  }

  async removeTask(taskId: string): Promise<void> {
    const result = await this.taskRepository.delete(taskId);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID '${taskId}' not found`);
    }
  }

  async editTask(updateTaskDto: UpdateTaskDto, taskId: string): Promise<Task> {
    const { title, description, dueDate, priority } = updateTaskDto;
    const task = await this.getTaskById(taskId);

    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;

    await this.taskRepository.save(task);

    return task;
  }

  async moveTaskToList(taskId: string, newListId: string): Promise<Task> {
    const task = await this.getTaskById(taskId);
    const newTaskList = await this.findListById(newListId);

    if (task.taskList.tasks && task.taskList.tasks.length > 0) {
      task.taskList.tasks = task.taskList.tasks.filter((t) => t.id !== taskId);
    }

    await this.tasksListRepository.save(task.taskList);

    task.taskList = newTaskList;

    return this.taskRepository.save(task);
  }
}
