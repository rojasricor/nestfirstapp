import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { UpdateTaskDto } from './dto/tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Array<Task> = [
    {
      id: '1',
      title: 'first task',
      description: 'Some task',
      status: TaskStatus.PENDING,
    },
  ];

  getAllTasks() {
    return this.tasks;
  }

  createTask(title: string, description: string) {
    const newTask = {
      id: new Date().toISOString(),
      title,
      description,
      status: TaskStatus.PENDING,
    };
    this.tasks.push(newTask);

    return newTask;
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  getTaskById(id: string): Task {
    return this.tasks.find((t) => t.id === id);
  }

  updateTask(id: string, updatedFields: UpdateTaskDto): Task {
    const taskFound = this.getTaskById(id);
    const taskUpdated = Object.assign(taskFound, updatedFields);
    this.tasks = this.tasks.map((t) => (t.id === id ? taskUpdated : taskFound));
    return taskUpdated;
  }
}
