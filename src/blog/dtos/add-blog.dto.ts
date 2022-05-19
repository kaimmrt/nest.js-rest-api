import { IsNotEmpty } from 'class-validator'

export class AddBlogDTO {
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly content: string;
}