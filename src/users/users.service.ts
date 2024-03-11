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

  async verifyPassword(body: LoginDTO) {
    const user = await this.users.findOne({
      where: { mobile: body.email },
    });

    // If the user doesn't exist, return an error
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const userPassword = user.password; // Assuming user.password is the hashed password stored in the database

    // Log the values for debugging
    console.log('Input password:', body.password);
    console.log('User password (hashed):', userPassword);

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await compare(body.password, userPassword);

    if (isPasswordValid) {
      console.log({
        success: true,
        message: 'Login successful',
        userData: user,
      });
      return { success: true, message: 'Login successful', userData: user };
    } else {
      return { success: false, message: 'Incorrect password' };
    }
  }

  async createUser(createUserDto: RegisterDTO) {
    return this.users.save(createUserDto);
  }

  // async verifyPassword(body: LoginDTO) {
  //   const user = await this.users.findOne({
  //     where: { mobile: body.email },
  //   });

  //   // If the user doesn't exist, return an error
  //   if (!user) {
  //     return { success: false, message: 'User not found' };
  //   }

  //   const userPassword = user.password; // Assuming user.password is the hashed password stored in the database

  //   // Compare the provided password with the hashed password in the database
  //   const isPasswordValid = await compare(body.password, userPassword);

  //   if (isPasswordValid) {
  //     console.log({
  //       success: true,
  //       message: 'Login successful',
  //       userData: user,
  //     });
  //     return { success: true, message: 'Login successful', userData: user };
  //   } else {
  //     return { success: false, message: 'Incorrect password' };
  //   }
  // }
}
