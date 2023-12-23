import { Controller, Get, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { UserId } from "../decorators/user-id.decorator";
import { UserEntity } from "./entities/user.entity";

@Controller("users")
@ApiTags("users")
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/me")
  @UseGuards(JwtAuthGuard)
  getMe(@UserId() id: number): Promise<UserEntity> {
    return this.usersService.findById(id);
  }
}
