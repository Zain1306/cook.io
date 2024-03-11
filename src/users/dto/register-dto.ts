import { IsNotEmpty } from 'class-validator';
 export class RegisterDTO {
   @IsNotEmpty()
   email: string;

   name: string;

   @IsNotEmpty()
   password: string;
 }