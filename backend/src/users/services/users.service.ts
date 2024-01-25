import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { UserInterface } from '../interfaces/user.interface';

const Joi = require('joi');

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({
      id: id,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email } });
  }

  async create(data: UserInterface) {
    try {
      const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        gender: Joi.string().required(),
      });

      const response = await schema.validateAsync(data);

      const user = await this.findByEmail(response.email);
      if (user) {
        throw new BadRequestException(
          `User with email ${response.email} already exists`,
        );
      }

      return await this.userRepo.save(response);
    } catch (error) {
      return error;
    }
  }

  async update(id: number, changes: UserInterface) {
    try {
      const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        gender: Joi.string().required(),
      });

      const response = await schema.validateAsync(changes);

      const user = await this.findOne(id);
      this.userRepo.merge(user, response);
      return await this.userRepo.save(user);
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    return await this.userRepo.delete(id);
  }
}
