import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Header, HttpException, Response, UseGuards, Request } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Menu, Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path'
import { createReadStream, createWriteStream } from 'fs';
import { cwd } from 'process';

import * as qr from 'qrcode';
import { ServerResponse } from 'http';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('restaurant')
@ApiTags('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @Post()
  create(@Body() createRestaurant: Prisma.RestaurantCreateInput) {
    return this.restaurantService.create(createRestaurant);
  }

  @Post('qr/:restaurantId')
  async createQr(@Param('restaurantId') restaurantId: number) {
    const fileName: string = `${restaurantId}.jpg`;
    const qrRoute:string = join(cwd(), '/upload/restaurant/qr/', fileName)
    
   
    qr.toFile(
      qrRoute,
      'Encode this text in QR code',
      {
        errorCorrectionLevel: 'H'
      },
      function (err) {
        if (err) throw err;
        console.log('QR code saved!');
      }
    );
    return this.restaurantService.createQr(+restaurantId, fileName); 
  }

  @Get('/:restaurantId/qr')// ! not tested
  @Header('Content-Type', 'image/jpg')
  // @UseInterceptors(FileInterceptor('file'))
  async downloadFile(@Param('restaurantId') restaurantId: string, @Response() res: ServerResponse) {
    const fileName: string = (await this.restaurantService.findOne(+restaurantId)).qr
    console.log(join(cwd(), '/upload/restaurant/qr/', fileName))
    if (fileName === '' || fileName === null)
      throw new HttpException('Image not found', 404);
    const file = createReadStream(join(cwd(), '/upload/restaurant/qr/', fileName));
    return file.pipe(res)
  }
  // @Get()
  // findAll() {
  //   return this.restaurantService.findAll();
  // }

  @Get()
  @UseGuards(JwtAuthGuard)
  findOne(@Request() req: any) {
    console.log(req.user.restaurantId)
    return this.restaurantService.findOne(+req.user.restaurantId);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(@Request() req: any, @Body() updateRestaurant: Prisma.RestaurantUpdateInput) {
    return this.restaurantService.update(+req.user.restaurantId, updateRestaurant);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(+id);
  }
}
