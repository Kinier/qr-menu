import { Injectable } from "@nestjs/common";
export interface Worker{
  id: number,
  workerSocketId: string,
  restaurantId: number
}

@Injectable()
export class SocketService {
  workers: Worker[];
  constructor(
  ) {this.workers = []}
  async createMessage(message: any) {
    return true
  }

  async addWorker(workerId: number, workerSocketId: string, restaurantId: number){
    console.log("new worker")
    this.workers.push({id: workerId, workerSocketId: workerSocketId, restaurantId: restaurantId})
  }

  async deleteWorker(workerSocketId: string){
    this.workers.filter((worker: Worker, index)=> worker.workerSocketId !== workerSocketId)
  }

  async getMessages() {
    return true
  }
}