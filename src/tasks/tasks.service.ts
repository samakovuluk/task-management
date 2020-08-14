import { Injectable, Param, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}


    async getTaskById(id: number, user: User): Promise<Task>{
        const found = await this.taskRepository.findOne({where: {id, userId: user.id}});
        if(!found){
            throw new NotFoundException();
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>{

       return this.taskRepository.createTask(createTaskDto, user);
    }

    async getAllTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]>{
        const tasks = await this.taskRepository.getTasks(filterDto, user);
        return tasks;
    }

    async deleteTask(id: number, user: User): Promise<void> {
        const con = this.taskRepository.delete({id, userId: user.id});
        if((await con).affected === 0){
            throw new NotFoundException(`Task with id ${id} not found.`)
        }
    }

    async updateStatus (id: number, status: TaskStatus, user: User): Promise<Task>{
        var task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task;
    }


}
