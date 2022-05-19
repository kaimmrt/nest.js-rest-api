import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BlogController } from "./blog.controller";
import { BlogSchema } from "./blog.schema";
import { BlogService } from "./blog.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }])],
    controllers: [BlogController],
    providers: [BlogService]
})
export class BlogModule { }