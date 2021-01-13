import { IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AccessControl } from 'src/app.roles';

export class CreateAdminDto {

  @ApiProperty()
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(AccessControl.Roles)
  readonly userRole: string

}