import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { Module } from '@nestjs/common';



@Module({
  providers: [SocketService, SocketGateway],
})
export class SocketModule {}