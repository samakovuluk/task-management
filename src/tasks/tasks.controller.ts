import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService){}

    @Get()
    getAllTasks(
        @Query(ValidationPipe) filterDto: GetTaskFilterDto
    ): Task[] {

        if(Object.keys(filterDto).length){
            return this.taskService.getFilterTask(filterDto)
        }
    
        return this.taskService.getAllTasks()
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task{
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
       @Body() createTaskDto: CreateTaskDto
    ): Task {

        return this.taskService.createTask(createTaskDto);

    }

    @Delete('/:id')
    deleteTask( @Param('id') id: string): void
    {
        this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Task {
        return this.taskService.updateStatus(id, status);
    }

}

