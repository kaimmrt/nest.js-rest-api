import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

import { AddBlogDTO } from "./dtos/add-blog.dto";
import { Blog, BlogDocument } from "./blog.schema";
import { IBlog } from "./blog.interface";

@Injectable()
export class BlogService {
    constructor(
        @InjectModel('Blog') private readonly blogModel: Model<BlogDocument>,
    ) { }

    async insertBlog(blog: AddBlogDTO): Promise<BlogDocument> {
        const newBlog = new this.blogModel({
            ...blog
        });
        console.log(newBlog)
        return newBlog.save();
    }

    async getBlogs(): Promise<IBlog[]> {
        const result = await this.blogModel.find().exec();
        return result as IBlog[];
    }

    async findBlog(blogId: string): Promise<IBlog> {
        const result = await this.blogModel.findById(blogId)
        return result as IBlog;
    }

    async updateBlog(blogId: string, data: AddBlogDTO) {
        console.log(data)
        return await this.blogModel.findByIdAndUpdate(blogId, {
            title: data.title,
            content: data.content
        })
    }
}