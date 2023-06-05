import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderItemService } from '../order-item/order-item.service';
import { Order, Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(private readonly orderService: OrderService, private readonly orderItemService: OrderItemService) { }

  @Post()
  create(@Body() createOrder: any) {
    createOrder.message = `${createOrder.table} столик, ${createOrder.message}`;
    const orderToCreate = {
      status: '4',
      establishmentId: +createOrder.establishmentId,
      message: createOrder.message
    }
    const order = this.orderService.create(orderToCreate);
    order.then((orderObject: Order) => {
      createOrder.items.map((item: any, index: any) => {
        console.log(item);
        this.orderItemService.create({ quantity: item.quantity, price: item.price, orderId: orderObject.id, itemId: item.id })
      })

      return order;
      //  this.orderItemService.create()
      //      id: 13,
      //      title: 'beef rissoles',
      //      quantity: 1,
      //      price: 10.99,
      //      priceGeneral: 10.99
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: any) {
    console.log()
    return this.orderService.findAll(req.user.establishmentId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrder: Prisma.OrderUpdateInput) {
    return this.orderService.update(+id, updateOrder);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() updateOrder: any) {
    return this.orderService.updateStatus(+id, +updateOrder.status);
  }

  @Get('/statistics/week/orders')
  async statisticsOrdersByLastWeek() {
    const stats = await this.orderService.statisticsOrdersByLastWeek();
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const groupedData = [];

    stats.forEach((item) => {
      const date = new Date(item.created_at);
      date.setDate(date.getDate() - 1);
      const dayOfWeek = days[date.getDay()];
      const dayData = groupedData.find((data) => data.name === dayOfWeek);
      if (dayData) {
        dayData.orders++;
      } else {
        groupedData.push({ name: dayOfWeek, orders: 1 });
      }
    });
    
    const result = days.map((day) => {
      const dayData = groupedData.find((data) => data.name === day);
      return {
        name: day,
        orders: dayData? dayData.orders : 0
      };
    });

    return result
  }

  @Get('/statistics/week/ordersPrice')
  async statisticsOrdersPriceByLastWeek() {
    const stats: any = await this.orderService.statisticsOrdersByLastWeek();
    // const orderItems = []
    for(const [i, stat] of stats.entries()){ // расчет за каждый order
      const orderItems = await this.orderItemService.findAllByOrder(stat.id);
      let gPrice = 0;
      orderItems.forEach((orderItem: any)=>{
        gPrice = orderItem.quantity * orderItem.price;
      })
      stats[i].price = gPrice;
      // stats[i].items = 
    }
    
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const groupedData = [];

    stats.forEach((item) => {
      

      const date = new Date(item.created_at);
      date.setDate(date.getDate() - 1);
      console.log(date)
      const dayOfWeek = days[date.getDay()];
    

      const dayData = groupedData.find((data) => data.name === dayOfWeek);
      if (dayData) {
        dayData.orders++;
        dayData.revenue += item.price;
      } else {
        groupedData.push({ name: dayOfWeek, orders: 1, revenue: item.price });
      }
    });
    const result = days.map((day) => {
      const dayData = groupedData.find((data) => data.name === day);
      return {
        name: day,
        orders: dayData? dayData.orders : 0,
        revenue: dayData? dayData.revenue : 0
      };
    });

    return result
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
