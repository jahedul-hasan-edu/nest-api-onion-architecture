import { IsNotEmpty } from "class-validator";

export class PostProductCommand {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly createdBy: string;
}