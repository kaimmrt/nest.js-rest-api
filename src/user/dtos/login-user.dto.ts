import { IsNotEmpty } from 'class-validator'

export class LoginUserDTO {
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}