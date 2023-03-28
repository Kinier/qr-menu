import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, StreamableFile, Response, Header, HttpException } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu, Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path'
import { cwd } from 'process';
import { ServerResponse } from 'http';
@Controller('menu')
@ApiTags('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }


  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(cwd());
    const writeStream = createWriteStream(join(cwd(), '/upload/menu', file.originalname));
    writeStream.write(file.buffer);
    writeStream.end();
  }

  @Get('/:menuId/photo')
  @Header('Content-Type', 'image/jpg')
  // @UseInterceptors(FileInterceptor('file'))
  async downloadFile(@Param('menuId') menuId: string, @Response() res: ServerResponse) {
    const fileName: string = (await this.menuService.findOne(+menuId)).photo
    console.log(join(cwd(), '/upload/menu/', fileName))
    if (fileName === '')
      throw new HttpException('Image not found', 404);
    const file = createReadStream(join(cwd(), '/upload/menu/', fileName));
    return file.pipe(res)
  }


  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(@Body() createMenu: {name: string, description: string, photo: string}, @UploadedFile() file?: Express.Multer.File | string) {
    
    const menu: Menu = await this.menuService.create(createMenu);
    if (file !== undefined && typeof file !== 'string') {
      const fileName: string = `${menu.id}.jpg`;
      // console.log(fileName);

      const writeStream = createWriteStream(join(cwd(), '/upload/menu/', fileName)); 
      writeStream.write(file.buffer);
      writeStream.end();
      createMenu.photo = fileName
    } else {
      createMenu.photo = ''
    }


    return await this.menuService.update(+menu.id, createMenu);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo'))
  update(@Param('id') id: string, @Body() updateMenu: { name?: string, description?: string, photo?: string }, @UploadedFile() file?: Express.Multer.File | string) {
    if (file !== undefined && typeof file !== 'string') {
      
      const fileName: string = `${id}.jpg`;
      const writeStream = createWriteStream(join(cwd(), '/upload/menu/', fileName)); 
      writeStream.write(file.buffer);
      writeStream.end();
      updateMenu.photo = fileName
    } else {
      delete updateMenu.photo 
    }

    return this.menuService.update(+id, updateMenu);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
