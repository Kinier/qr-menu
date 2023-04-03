import { SocketModule } from './socket/socket.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MenuModule } from './menu/menu.module';
import { CategoryModule } from './category/category.module';
import { ItemModule } from './item/item.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, RestaurantModule, MenuModule, CategoryModule, ItemModule, OrderModule, OrderItemModule, AuthModule, SocketModule],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
