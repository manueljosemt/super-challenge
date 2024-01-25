import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { UserInterface } from '../interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() payload: UserInterface) {
    return await this.usersService.create(payload);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UserInterface,
  ) {
    return await this.usersService.update(id, payload);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.remove(+id);
  }
}
