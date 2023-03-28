import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UploadedFile, UseInterceptors, Header, Response, HttpException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category, Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path'
import { cwd } from 'process';
import { ServerResponse } from 'http';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/:categoryId/photo')
  @Header('Content-Type', 'image/jpg')
  // @UseInterceptors(FileInterceptor('file'))
  async downloadFile(@Param('categoryId') menuId: string, @Response() res: ServerResponse) {
    const fileName: string = (await this.categoryService.findOne(+menuId)).photo
    console.log(join(cwd(), '/upload/category/', fileName))
    if (fileName === '')
      throw new HttpException('Image not found', 404);
    const file = createReadStream(join(cwd(), '/upload/category/', fileName));
    return file.pipe(res)
  }
  
  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(@Body() createCategory: {name: string, menuId: string, photo: string}, @UploadedFile() file?: Express.Multer.File | string) {
    
    const category: Category = await this.categoryService.create(createCategory);
    if (file !== undefined && typeof file !== 'string') {
      const fileName: string = `${category.id}.jpg`;
      // console.log(fileName);

      const writeStream = createWriteStream(join(cwd(), '/upload/category/', fileName)); 
      writeStream.write(file.buffer);
      writeStream.end();
      createCategory.photo = fileName
    } else {
      createCategory.photo = ''
    }


    return await this.categoryService.update(+category.id, createCategory);
  }

  @Get('/menu/:menuId')
  findAll(@Param('menuId') menuId: string) {
    return this.categoryService.findAll({menuId: +menuId});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo'))
  update(@Param('id') id: string, @Body() updateCategory: {name?: string, photo?: string}, @UploadedFile() file?: Express.Multer.File|string) {
    if (file !== undefined && typeof file !== 'string') {
      const fileName: string = `${id}.jpg`;
      const writeStream = createWriteStream(join(cwd(), '/upload/category/', fileName)); 
      writeStream.write(file.buffer);
      writeStream.end();
      updateCategory.photo = fileName
    }else{
      delete updateCategory.photo 
    }
    return this.categoryService.update(+id, updateCategory);
  }
  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
