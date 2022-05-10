import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetails } from './user-details.interface';
import { User } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    _getUserDetails(user: User): UserDetails {
        return {
            id: user._id,
            name: user.name,
            email: user.email
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findById(id: string): Promise<UserDetails | null> {
        const user = await this.userModel.findById(id).exec();
        if (!user) return null;
        return this._getUserDetails(user)
    }

    async create(name: string, email: string, hashedPassword: string): Promise<User> {
        const newUser = new this.userModel({
            name,
            email,
            password: hashedPassword
        })
        return newUser.save();
    }


}
