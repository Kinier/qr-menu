import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Header, HttpException, Response, UseGuards, Request, Req } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { Menu, Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path'
import { createReadStream, createWriteStream } from 'fs';
import { cwd } from 'process';
import {Request as Re} from 'express';
import * as qr from 'qrcode';
import { ServerResponse } from 'http';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('establishment')
@ApiTags('establishment')
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) { }

  @Post()
  create(@Body() createEstablishment: Prisma.EstablishmentCreateInput) {
    return this.establishmentService.create(createEstablishment);
  }

  @Post('qr/:establishmentId')
  async createQr(@Param('establishmentId') establishmentId: number,@Req() req: Re, @Response() res: ServerResponse) {
    const fileName: string = `${establishmentId}.jpg`;
    const qrRoute:string = join(cwd(), '/upload/establishment/qr/', fileName)
    
   
    qr.toFile(
      qrRoute,
      `${req.protocol}://${req.hostname}:3000/${establishmentId}`,
      {
        errorCorrectionLevel: 'H',
      },
      function (err) {
        if (err) throw err;
        console.log('QR code saved!');
      }
    );
    await this.establishmentService.createQr(+establishmentId, fileName);
    const file = createReadStream(join(cwd(), '/upload/establishment/qr/', fileName));
    return file.pipe(res)
  }

  @Get('/:establishmentId/qr')
  @Header('Content-Type', 'image/jpg')
  // @UseInterceptors(FileInterceptor('file'))
  async downloadFile(@Param('establishmentId') establishmentId: string, @Response() res: ServerResponse) {
    const fileName: string = (await this.establishmentService.findOne(+establishmentId)).qr
    console.log(join(cwd(), '/upload/establishment/qr/', fileName))
    if (fileName === '' || fileName === null)
      throw new HttpException('Image not found', 404);
    const file = createReadStream(join(cwd(), '/upload/establishment/qr/', fileName));
    return file.pipe(res)
  }
  // @Get()
  // findAll() {
  //   return this.establishmentService.findAll();
  // }

  @Get()
  @UseGuards(JwtAuthGuard)
  findOne(@Request() req: any) {
    console.log(req.user.establishmentId)
    return this.establishmentService.findOne(+req.user.establishmentId);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(@Request() req: any, @Body() updateEstablishment: Prisma.EstablishmentUpdateInput) {
    return this.establishmentService.update(+req.user.establishmentId, updateEstablishment);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.establishmentService.remove(+id);
  }
}
