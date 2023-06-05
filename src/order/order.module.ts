import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma.service';
import { OrderItemService } from 'src/order-item/order-item.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, OrderItemService]
})
export class OrderModule {}
