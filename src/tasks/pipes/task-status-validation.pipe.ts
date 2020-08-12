import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";


export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.DONE,
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
    ];

    transform(value: any) {

        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException("Invalid status");
        }

        return value;
    }


    isStatusValid(status: any){
        const idx = this.allowedStatuses.indexOf(status);
        return idx!==-1;
    }

   





}