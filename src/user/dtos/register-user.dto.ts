import { IsNotEmpty } from 'class-validator'

export class RegisterUserDTO {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}