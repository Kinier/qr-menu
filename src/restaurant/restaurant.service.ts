import { Injectable } from '@nestjs/common';
import { Restaurant, Prisma } from '@prisma/client';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService){}

  async create(restaurantCreate: Prisma.RestaurantCreateInput): Promise<Restaurant> {
    
    return this.prisma.restaurant.create({data: restaurantCreate});
  }

  async createQr(restaurantId: number, qrRoute: string): Promise<Restaurant> {
    
    return this.prisma.restaurant.update({where: {id: restaurantId}, data: {qr: qrRoute}});
  }

  async findAll(): Promise<Restaurant[]> {
    return this.prisma.restaurant.findMany({orderBy: {id: "asc"}});
  }

  async findOne(id: number): Promise<Restaurant> {
    return this.prisma.restaurant.findUnique({where: {id: id}});
  }

  async update(id: number, updateRestaurant: Prisma.RestaurantUpdateInput): Promise<Restaurant> {
    console.log(updateRestaurant)
    return this.prisma.restaurant.update({
      where: {id: id},
      data: updateRestaurant
    })
  }

  async remove(id: number): Promise<Restaurant> {
    return this.prisma.restaurant.delete({
      where: {id: id}
    })
  }
}
