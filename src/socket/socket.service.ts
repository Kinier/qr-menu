import { Injectable } from "@nestjs/common";

@Injectable()
export class SocketService {
  constructor(
  ) {}
  async createMessage(message: any) {
    return true
  }

  async getMessages() {
    return true
  }
}