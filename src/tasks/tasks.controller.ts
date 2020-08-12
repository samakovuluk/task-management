import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, Query, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService){}

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task>{
        return this.taskService.getTaskById(id);
    }

    @Get()
    getAllTasks(
        @Query(ValidationPipe) filterDto: GetTaskFilterDto
    ) {    
        return this.taskService.getAllTasks(filterDto);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
       @Body() createTaskDto: CreateTaskDto
    ): Promise<Task> {

        return this.taskService.createTask(createTaskDto);

    }

    @Delete('/:id')
    deleteTask( @Param('id', ParseIntPipe) id: number): Promise<void>
    {
        return this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Promise<Task> {

        return this.taskService.updateStatus(id, status);
    }


    /*
    

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task{
        return this.taskService.getTaskById(id);
    }

    

    

    
    */

}

