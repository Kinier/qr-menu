import { jwtConstants } from './../auth/constants';
import { JwtModule } from '@nestjs/jwt';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';



@Module({
  providers: [SocketService, SocketGateway],
  imports: [JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: jwtConstants.ttl} 
  }), UserModule]
})
export class SocketModule {}