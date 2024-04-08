import { Task } from 'src/tasks/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TasksList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Task, (task) => task.taskList, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  tasks: Task[];
}
