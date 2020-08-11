import { Injectable, Param, NotFoundException } from '@nestjs/common';
import  {Task, TaskStatus} from './task.model';
import {v4 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks;
    }

    getFilterTask(filterDto: GetTaskFilterDto): Task[]{
        const {status, search} = filterDto;

        let tasks = this.getAllTasks();

        if(status){
            tasks = tasks.filter(task => task.status === status);
        }

        if(search){
            tasks = tasks.filter(task =>
                task.title.includes(search) || task.title.includes(search));
        }

        return tasks;
    }

    getTaskById(id: string): Task{
        const found = this.tasks.find(task => task.id === id);
        
        if(!found){
            throw new NotFoundException();
        }

        return found;
    }   

    createTask(createTaskDto: CreateTaskDto): Task{

        const {title, description} = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;

    }

    deleteTask(id: string): void{
        this.tasks = this.tasks.filter(tasks => tasks.id!=id)
    }

    updateStatus(id: string, status: TaskStatus): Task{
        var task = this.getTaskById(id);
        task.status = status;
        return task;
    }


}
