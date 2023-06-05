import { Injectable } from '@nestjs/common';
import { OrderItem, Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderItemService {
  constructor(private prisma: PrismaService){}

  async create(orderItemCreate: any): Promise<OrderItem> {
    
    return this.prisma.orderItem.create({data: orderItemCreate});
  }

  async findAll(): Promise<OrderItem[]> {
    return this.prisma.orderItem.findMany({orderBy: {id: "asc"}});
  }

  async findAllByOrder(orderId: number): Promise<OrderItem[]> {
    return this.prisma.orderItem.findMany({orderBy: {id: "asc"}, where: {orderId: orderId}});
  }

  async findOne(id: number): Promise<OrderItem> {
    return this.prisma.orderItem.findUnique({where: {id: id}});
  }

  async update(id: number, updateOrderItem: Prisma.OrderItemUpdateInput): Promise<OrderItem> {
    return this.prisma.orderItem.update({
      where: {id: id},
      data: updateOrderItem
    })
  }

  async remove(id: number): Promise<OrderItem> {
    return this.prisma.orderItem.delete({
      where: {id: id}
    })
  }
}
