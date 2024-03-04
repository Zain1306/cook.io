import { Body, Controller, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDTO } from './dto/login-dto';
import { RegisterDTO } from './dto/register-dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

   @Post('login')
  async login(
    @Body() body: LoginDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const returnData: any = await this.userService.verifyPassword(body);

    return returnData;
  }


  @Post('create/user')
  async registerUser(@Body() createUserDto: RegisterDTO) {
    
    console.log(createUserDto);
    return await this.userService.createUser(createUserDto);
  }
}

