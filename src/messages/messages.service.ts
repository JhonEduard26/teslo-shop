import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface ConnectedClient {
  [id: string]: Socket;
}

@Injectable()
export class MessageService {
  private connectedClients: ConnectedClient = {};

  registerClient(client: Socket) {
    this.connectedClients[client.id] = client;
  }

  removeClient(id: string) {
    delete this.connectedClients[id];
  }

  getConnectedClients() {
    return Object.keys(this.connectedClients).length;
  }
}
