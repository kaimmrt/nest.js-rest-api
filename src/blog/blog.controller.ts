import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { IBlog } from "./blog.interface";
import { BlogService } from "./blog.service";
import { AddBlogDTO } from "./dtos/add-blog.dto";

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) { }

    @Post('')
    add(@Body() blog: AddBlogDTO) {
        return this.blogService.insertBlog(blog)
    }

    @Get('')
    async getAllProducts() {
        const blogs = await this.blogService.getBlogs();
        return blogs;
    }

    @Get(':id')
    getBlog(@Param('id') blogId: string) {
        return this.blogService.findBlog(blogId)
    }

    @Put(':id')
    async updateProduct(
        @Param('id') blogId: string,
        @Body() data: AddBlogDTO,
    ) {
        await this.blogService.updateBlog(blogId, data)
        return null;
    }
}