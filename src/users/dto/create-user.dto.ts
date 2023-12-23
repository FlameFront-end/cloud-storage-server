import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ default: 'test@mail.ru' })
  email: string

  @ApiProperty({ default: 'Васёк' })
  fullName: string

  @ApiProperty({ default: '12345' })
  password: string
}
