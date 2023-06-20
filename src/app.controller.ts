import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('all')
  getAll(): { name: string }[] {
    return this.appService.getAll();
  }

  @Post('name')
  greet(@Body() { name }: { name: string }): string {
    return `hello ${name}`;
  }

  @Delete('/users/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    let users = [1, 2, 3];
    if (!users.includes(id)) throw new NotFoundException('user does not exist');
    return `user ${id} deleted`;
  }
}
