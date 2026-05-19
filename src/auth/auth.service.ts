import {
  Injectable,

  UnauthorizedException,
} from '@nestjs/common';

import { JwtService }
from '@nestjs/jwt';

import { PrismaService }
from '../prisma/prisma.service';

import * as bcrypt
from 'bcrypt';

@Injectable()

export class AuthService {

  constructor(

    private jwtService: JwtService,

    private prisma: PrismaService,

  ) {}

  async register(dto: any) {

    const hashedPassword =
      await bcrypt.hash(
        dto.password,
        10,
      );

    const user =
      await this.prisma.user.create({

        data: {

          username:
            dto.username,

          email:
            dto.email,

          password:
            hashedPassword,
        },
      });

    return {
      message:
        'usuario creado',

      user,
    };
  }

  async login(dto: any) {

    const user =
      await this.prisma.user.findUnique({

        where: {
          email: dto.email,
        },
      });

    if (!user) {

      throw new UnauthorizedException(
        'Usuario no existe',
      );
    }

    const passwordValid =
      await bcrypt.compare(

        dto.password,

        user.password,
      );

    if (!passwordValid) {

      throw new UnauthorizedException(
        'Password incorrecto',
      );
    }

    const payload = {

      id: user.id,

      email: user.email,
    };

    return {

      access_token:
        this.jwtService.sign(
          payload,
        ),
    };
  }
}