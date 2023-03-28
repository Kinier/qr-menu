import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { OrderItemService } from './order-item.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('order-item')
@ApiTags('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  create(@Body() createOrderItem: Prisma.OrderItemCreateInput) {
    return this.orderItemService.create(createOrderItem);
  }

  @Get()
  findAll() {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderItem: Prisma.OrderItemUpdateInput) {
    return this.orderItemService.update(+id, updateOrderItem);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemService.remove(+id);
  }
}
