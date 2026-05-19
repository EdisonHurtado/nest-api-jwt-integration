import {
  IsEmail,
  MinLength,
} from 'class-validator';

import {
  ApiProperty,
} from '@nestjs/swagger';

export class RegisterDto {

  @ApiProperty({
    example: 'edison',
  })

  username!: string;

  @ApiProperty({
    example: 'edison@gmail.com',
  })

  @IsEmail()

  email!: string;

  @ApiProperty({
    example: '123456',
  })

  @MinLength(6)

  password!: string;
}