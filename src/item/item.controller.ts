import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Header, HttpException, Response } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item, Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path'
import { createReadStream, createWriteStream } from 'fs';
import { cwd } from 'process';
import { ServerResponse } from 'http';

@Controller('item')
@ApiTags('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/:itemId/photo')// ! not tested
  @Header('Content-Type', 'image/jpg')
  // @UseInterceptors(FileInterceptor('file'))
  async downloadFile(@Param('itemId') itemId: string, @Response() res: ServerResponse) {
    const fileName: string = (await this.itemService.findOne(+itemId)).photo
    console.log(join(cwd(), '/upload/item/', fileName))
    if (fileName === '')
      throw new HttpException('Image not found', 404);
    const file = createReadStream(join(cwd(), '/upload/item/', fileName));
    return file.pipe(res)
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(@Body() createItem: {name: string, description: string, menuId: string, photo: string, price: number}, @UploadedFile() file?: Express.Multer.File | string) {
    
    const item: Item = await this.itemService.create(createItem);
    if (file !== undefined && typeof file !== 'string') {
      const fileName: string = `${item.id}.jpg`;
      // console.log(fileName);

      const writeStream = createWriteStream(join(cwd(), '/upload/item/', fileName)); // todo ид ресторана
      writeStream.write(file.buffer);
      writeStream.end();
      createItem.photo = fileName
    } else {
      createItem.photo = ''
    }


    return await this.itemService.update(+item.id, createItem);
  }

  @Get('/category/:categoryId')
  findAll(@Param('categoryId') categoryId: string) {
    return this.itemService.findAll({categoryId: +categoryId});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }
  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo'))
  update(@Param('id') id: string, @Body() updateItem: {name?: string, description?: string, price?: string, photo?: string}, @UploadedFile() file?: Express.Multer.File|string) {
    if (file !== undefined && typeof file !== 'string') {
      const fileName: string = `${id}.jpg`;
      const writeStream = createWriteStream(join(cwd(), '/upload/item/', fileName)); 
      writeStream.write(file.buffer);
      writeStream.end();
      updateItem.photo = fileName
    }else{
      delete updateItem.photo 
    }
    const price = +updateItem.price
    delete updateItem.price
    return this.itemService.update(+id, {...updateItem, price: price});
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
