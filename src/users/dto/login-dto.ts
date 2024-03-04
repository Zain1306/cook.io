import { IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  mobile: string;

  @IsNotEmpty()
  password: string;
}
