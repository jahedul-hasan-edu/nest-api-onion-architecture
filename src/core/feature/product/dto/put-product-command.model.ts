import { IsNotEmpty } from "class-validator";

export class PutProductCommand {
    @IsNotEmpty()
    readonly id: string;

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly modifiedBy: string;
}