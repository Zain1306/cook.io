import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDTO } from './dto/login-dto';

import { compare } from 'bcrypt';
import { RegisterDTO } from './dto/register-dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private users: Repository<User>) {}

  async login(body: LoginDTO): Promise<any> {
    try {
      const userIs = await this.users.findOne({
        where: { mobile: body.mobile },
      });
      if (!userIs)
        throw new HttpException('Invalid mobile', HttpStatus.UNAUTHORIZED);

      const areEqual = await compare(body.password, userIs.password);

      if (areEqual)
        throw new HttpException('Invalid Password', HttpStatus.UNAUTHORIZED);
      return {
        message: 'Login Successfully.',
        StatusCode: HttpStatus.OK,
        data: {
          userIs,
        },
      };
    } catch (error) {
      Logger.verbose(error);
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async createUser(createUserDto: RegisterDTO) {
    return this.users.save(createUserDto);
  }

     async verifyPassword(body: LoginDTO) {
    // Find the user by Aadhar ID
    const user = await this.users.findOne({
      where: { mobile: body.mobile },
    });

    // If the user doesn't exist, return an error
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const userPassword = user.password; // Assuming user.password is the hashed password stored in the database

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await compare(body.password, userPassword);

    if (isPasswordValid) {
      console.log({ success: true, message: 'Login successful', userData: user });
      return { success: true, message: 'Login successful', userData: user };
    } else {
      return { success: false, message: 'Incorrect password' };
    }
  }
}
