import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService){}

  async create(orderCreate: Prisma.OrderCreateInput): Promise<Order> {
    
    return this.prisma.order.create({data: orderCreate});
  }

  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany({orderBy: {id: "asc"}});
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

  async remove(id: number): Promise<Order> {
    return this.prisma.order.delete({
      where: {id: id}
    })
  }
}
