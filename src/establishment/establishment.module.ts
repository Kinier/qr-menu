import { Module } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { EstablishmentController } from './establishment.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [EstablishmentController],
  providers: [EstablishmentService, PrismaService],
  exports: [EstablishmentService]
})
export class EstablishmentModule {}
