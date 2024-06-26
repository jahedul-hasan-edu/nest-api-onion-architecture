import { IsNotEmpty, IsUUID } from "class-validator";

export class DeleteProductCommand {
    @IsNotEmpty()
    @IsUUID()
    readonly id: string;
}