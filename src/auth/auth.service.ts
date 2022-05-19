import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { LoginUserDTO } from 'src/user/dtos/login-user.dto';
import { RegisterUserDTO } from 'src/user/dtos/register-user.dto';
import { UserDetails } from 'src/user/user-details.interface';
import { UserService } from 'src/user/user.service';
import { SECRET_KEY } from 'src/config';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,) { }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12)
    }

    async register(user: Readonly<RegisterUserDTO>): Promise<UserDetails | any> {
        const { name, email, password } = user;

        const existingUser = await this.userService.findByEmail(email);

        if (existingUser) return 'Email taken!';

        const hashedPassword = await this.hashPassword(password);
        const newUser = await this.userService.create(name, email, hashedPassword);
        return this.userService._getUserDetails(newUser);
    }

    async doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    async validateUser(email: string, password: string): Promise<UserDetails | null> {
        const user = await this.userService.findByEmail(email);
        console.log("user", user)
        const doesUserExist = !!user;

        if (!doesUserExist) return null

        const doesPasswordMatch = await this.doesPasswordMatch(password, user.password)

        if (!doesPasswordMatch) throw { statusCode: 404, message: "Username or password is wrong" }

        return this.userService._getUserDetails(user);
    }

    async login(existingUser: LoginUserDTO): Promise<{ token: string } | null> {
        const { email, password } = existingUser;
        const user = await this.validateUser(email, password);

        if (!user) throw { statusCode: 404, message: "username or password is wrong" }
        const token = this.generateJWT(user)
        return { token: token };
    }

    public generateJWT(user: UserDetails) {
        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
        }, SECRET_KEY);
        return token;
    };
}
