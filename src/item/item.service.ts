import { Injectable, Logger } from '@nestjs/common';
import { Item, Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService){}

  async create(itemCreate: any): Promise<Item> {
    
    const categoryId = +itemCreate.categoryId;
    delete itemCreate.categoryId;
    const price: number = +itemCreate.price;
    delete itemCreate.price
    return this.prisma.item.create({data: {...itemCreate, categoryId: categoryId, price: price}});
  }

  async findAll({categoryId}: {categoryId: number}): Promise<Item[]> {
    return this.prisma.item.findMany({orderBy: {id: "asc"}, where: {categoryId: categoryId}});
  }



  async findOne(id: number): Promise<Item> {
    return this.prisma.item.findUnique({where: {id: id}});
  }

  async update(id: number, updateItem: Prisma.ItemUpdateInput): Promise<Item> {
    return this.prisma.item.update({
      where: {id: id},
      data: updateItem
    })
  }

  async remove(id: number): Promise<Item> {
    return this.prisma.item.delete({
      where: {id: id}
    })
  }
}
