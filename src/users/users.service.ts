import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService }
from '../prisma/prisma.service';

import { UpdateUserDto }
from './dto/update-user.dto';

@Injectable()

export class UsersService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async findAll() {

    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
  }

  async findOne(id: number) {

    const user =
      await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          username: true,
          email: true,
        },
      });

    if (!user) {

      throw new NotFoundException(
        'Usuario no encontrado',
      );
    }

    return user;
  }

  async update(
    id: number,
    data: UpdateUserDto,
  ) {

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {

    return this.prisma.user.delete({
      where: { id },
    });
  }
}