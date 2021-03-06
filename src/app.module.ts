import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';

import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductsController } from './products/products.controller';
import { AuthMiddleware } from './middlewares/get-user.middleware';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    AuthModule,
    BlogModule,
    ProductsModule,
    UserModule,
    MongooseModule.forRoot('mongodb+srv://mert:password1234@cluster0.fbssk.mongodb.net/nestjs-demo?retryWrites=true&w=majority'),
  ],
  controllers: [
    AppController
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {

    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        ProductsController
      );
  }
}
