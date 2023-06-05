import { JwtService } from '@nestjs/jwt';
import { Worker } from './socket.service';
import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Socket, Server } from 'socket.io';
  import { SocketService } from './socket.service';
import { Headers } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
interface Order {
  establishmentId: number,
  items: Array<Object>,
  table: number
}

interface JwtPayload {
  email: string,
  establishmentId: number
}
  @WebSocketGateway({
    cors: {
      origin: '*',
    },

  })
  
  export class SocketGateway
    implements OnGatewayConnection, OnGatewayDisconnect
  {
    constructor(private socketService: SocketService, private jwtService: JwtService, private userService: UserService) {}
  
    @WebSocketServer() server: Server;
  
    @SubscribeMessage('sendMessage')
    async handleSendMessage(client: Socket, payload: any): Promise<void> {
      await this.socketService.createMessage(payload);
      this.server.emit('recMessage', payload);
    }

    
    @SubscribeMessage('orderByClient')
    async handleOrderByClient(client: Socket, payload: any): Promise<void> {
      
      // await this.socketService.createMessage(payload);
      console.log(this.socketService.workers)
      this.socketService.workers.map((worker: Worker, index)=>{
        if (worker.establishmentId === payload.establishmentId){
          this.server.to(worker.workerSocketId).emit("orderByClient", "{payload}")
        }
      })
    }
  

  
    handleDisconnect(client: Socket) {
      console.log(`Disconnected: ${client.id}`);
      this.socketService.deleteWorker(client.id)
      client.disconnect()
    }
    
    async handleConnection(client: Socket, @Headers() headers: any, ...args: any[]) {
      
      try{
        if (this.jwtService.verify(client.handshake.headers.authorization.split(' ')[1])){
          
          const jwt = this.jwtService.decode(client.handshake.headers.authorization.split(' ')[1]) as JwtPayload
        
          const user: User = await this.userService.findOneByEmail(jwt.email)
          await this.socketService.addWorker(user.id, client.id, jwt.establishmentId)
        }
            
        
    }catch{

        // client.disconnect(true)
        return; // ! after this, code for worker
    }
    
        
      console.log(`Connected ${client.id}`);
    }
  }


