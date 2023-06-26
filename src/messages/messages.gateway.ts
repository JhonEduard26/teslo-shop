import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { MessageService } from './messages.service';

@WebSocketGateway({ cors: true })
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messageService: MessageService) {}
  handleConnection(client: Socket) {
    console.log('Client connected: ' + client.id);
    this.messageService.registerClient(client);
    console.log({ clients: this.messageService.getConnectedClients() });
  }
  handleDisconnect(client: Socket) {
    console.log('Client disconnected: ' + client.id);
    this.messageService.removeClient(client.id);
    console.log({ clients: this.messageService.getConnectedClients() });
  }
}
