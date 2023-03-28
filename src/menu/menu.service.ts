import { Injectable, Logger } from '@nestjs/common';
import { Menu, Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService){}

  async create(menuCreate: any): Promise<Menu> {  // мастерское решение проблемы
    return this.prisma.menu.create({data: {...menuCreate, restaurantId: 1}}); // todo этот ид должен в теории быть в jwt мб?
  }

  async findAll(): Promise<Menu[]> {
    return this.prisma.menu.findMany({orderBy: {id: "asc"}}); // todo добавить ко всем я думаю так
  }

  async findOne(id: number): Promise<Menu> {
    return this.prisma.menu.findUnique({where: {id: id}});
  }

  async update(id: number, updateMenu: Prisma.MenuUpdateInput): Promise<Menu> {
    return this.prisma.menu.update({
      where: {id: id},
      data: updateMenu
    })
  }

  async remove(id: number): Promise<Menu> {
    return this.prisma.menu.delete({
      where: {id: id},
    })
  }
}
