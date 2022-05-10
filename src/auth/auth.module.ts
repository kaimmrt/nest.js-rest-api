import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { SECRET_KEY } from '../config';

// import { JwtGuard } from './guards/jwt.guard';
// import { JwtStrategy } from './guards/jwt.strategy';

@Module({
  imports: [UserModule, JwtModule.registerAsync({
    useFactory: () => ({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '3600s' }
    })
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
