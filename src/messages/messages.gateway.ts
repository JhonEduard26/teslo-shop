import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Server, Socket } from 'socket.io';

import { MessageService } from './messages.service';
import { NewMessageDto } from './dto/new-message.dto';

@WebSocketGateway({ cors: true })
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(
    private readonly messageService: MessageService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;

    let payload: any;

    try {
      payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      await this.messageService.registerClient(client, payload.id);
    } catch (error) {
      client.disconnect();
      return;
    }

    this.wss.emit('clients-updated', this.messageService.getConnectedClients());
  }

  handleDisconnect(client: Socket) {
    this.messageService.removeClient(client.id);
    this.wss.emit('clients-updated', this.messageService.getConnectedClients());
  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: NewMessageDto) {
    this.wss.emit('message-from-server', {
      fullName: this.messageService.getUserFullName(client.id),
      message: payload.message || 'no-message!!',
    });
  }
}
