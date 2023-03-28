import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService){}

  async create(userCreate: Prisma.UserCreateInput): Promise<User> {
    
    return this.prisma.user.create({data: userCreate});
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({orderBy: {id: "asc"}});
  }

  async findOne(id: number): Promise<User> {
    return this.prisma.user.findUnique({where: {id: id}});
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({where: {email: email}});
  }

  async update(id: number, updateUser: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: {id: id},
      data: updateUser
    })
  }

  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: {id: id}
    })
  }
}
