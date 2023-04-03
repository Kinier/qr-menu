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
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
    // namespace: '/api/orders',

  })
  export class SocketGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
  {
    constructor(private socketService: SocketService) {}
  
    @WebSocketServer() server: Server;
  
    @SubscribeMessage('sendMessage')
    async handleSendMessage(client: Socket, payload: any): Promise<void> {
      await this.socketService.createMessage(payload);
      console.log(payload)
      this.server.emit('recMessage', payload);
    }
  
    afterInit(server: Server) {
      console.log(server);
      //Do stuffs
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Disconnected: ${client.id}`);
      //Do stuffs
    }
  
    handleConnection(client: Socket, ...args: any[]) {
        console.log("sfdafsdf")
      console.log(`Connected ${client.id}`);
      //Do stuffs
    }
  }