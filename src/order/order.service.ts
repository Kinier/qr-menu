import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService){}

  async create(orderCreate: any): Promise<Order> {
    
    const order: Order = await this.prisma.order.create({data: orderCreate});

    return order;

  }

  async findAll(establishmentId: number): Promise<Order[]> {
    return this.prisma.order.findMany({orderBy: {id: "asc"}, where: {establishmentId: establishmentId}});
  }

  async statisticsOrdersByLastWeek(): Promise<Order[]> {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    console.log(today, sevenDaysAgo)
    return this.prisma.order.findMany({orderBy: {id: "asc"}, 
    where: {
      created_at: {
        lte: today,
        gte: sevenDaysAgo,
      }
    },
  });
  }

  async findOne(id: number): Promise<Order> {
    return this.prisma.order.findUnique({where: {id: id}});
  }

  async update(id: number, updateOrder: Prisma.OrderUpdateInput): Promise<Order> {
    return this.prisma.order.update({
      where: {id: id},
      data: updateOrder
    })
  }

  async updateStatus(id: number, status: number): Promise<Order> {
    console.log(id, status)

    return this.prisma.order.update({
      where: {id: id},
      data: {status: `${status}`}
    })
  }

  async remove(id: number): Promise<Order> {
    return this.prisma.order.delete({
      where: {id: id}
    })
  }
}
