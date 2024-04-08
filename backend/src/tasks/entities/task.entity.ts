import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskPriority } from '../task.enum';
import { TasksList } from 'src/tasks/entities/list.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: TaskPriority.MEDIUM })
  priority: TaskPriority;

  @Column({ nullable: true })
  dueDate: Date;

  @ManyToOne(() => TasksList, (taskList) => taskList.tasks, {
    onDelete: 'CASCADE',
  })
  taskList: TasksList;
}
