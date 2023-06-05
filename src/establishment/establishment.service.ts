import { Injectable } from '@nestjs/common';
import { Establishment, Prisma } from '@prisma/client';
import { CreateRestaurantDto } from './dto/create-establishment.dto';
import { UpdateRestaurantDto } from './dto/update-establishment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EstablishmentService {
  constructor(private prisma: PrismaService){}

  async create(establishmentCreate: Prisma.EstablishmentCreateInput): Promise<Establishment> {
    
    return this.prisma.establishment.create({data: establishmentCreate});
  }

  async createQr(establishmentId: number, qrRoute: string): Promise<Establishment> {
    
    return this.prisma.establishment.update({where: {id: establishmentId}, data: {qr: qrRoute}});
  }

  async findAll(): Promise<Establishment[]> {
    return this.prisma.establishment.findMany({orderBy: {id: "asc"}});
  }

  async findOne(id: number): Promise<Establishment> {
    return this.prisma.establishment.findUnique({where: {id: id}});
  }

  async update(id: number, updateEstablishment: Prisma.EstablishmentUpdateInput): Promise<Establishment> {
    console.log(updateEstablishment)
    return this.prisma.establishment.update({
      where: {id: id},
      data: updateEstablishment
    })
  }

  async remove(id: number): Promise<Establishment> {
    return this.prisma.establishment.delete({
      where: {id: id}
    })
  }
}
