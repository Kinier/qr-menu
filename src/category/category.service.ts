import { Injectable, Logger } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService){}

  async create(categoryCreate: any): Promise<Category> {
    const menuId = +categoryCreate.menuId;
    delete categoryCreate.menuId;
    return this.prisma.category.create({data: {...categoryCreate, menuId: menuId}});
  }

  async findAll({menuId}: {menuId: number}): Promise<Category[]> {
    return this.prisma.category.findMany({orderBy: {id: "asc"}, where: {menuId: menuId}});
  }

  async findOne(id: number): Promise<Category> {
    return this.prisma.category.findUnique({where: {id: id}});
  }

  async update(id: number, updateCategory: Prisma.CategoryUpdateInput): Promise<Category> {
    return this.prisma.category.update({
      where: {id: id},
      data: updateCategory
    })
  }

  async remove(id: number): Promise<Category> {
    return this.prisma.category.delete({
      where: {id: id}
    })
  }
}
