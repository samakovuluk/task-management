import { Injectable, Param, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}


    async getTaskById(id: number): Promise<Task>{
        const found = await this.taskRepository.findOne(id);
        if(!found){
            throw new NotFoundException();
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{

       return this.taskRepository.createTask(createTaskDto);
    }

    async getAllTasks(filterDto: GetTaskFilterDto): Promise<Task[]>{
        const tasks = await this.taskRepository.getTasks(filterDto);
        return tasks;
    }

    async deleteTask(id: number): Promise<void> {
        const con = this.taskRepository.delete(id);
        if((await con).affected === 0){
            throw new NotFoundException(`Task with id ${id} not found.`)
        }
    }

    async updateStatus (id: number, status: TaskStatus): Promise<Task>{
        var task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }

    /*
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

   
    */

}
