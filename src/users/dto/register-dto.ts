import { IsNotEmpty } from 'class-validator';
 export class RegisterDTO {
   @IsNotEmpty()
   mobile: string;

   name: string;

   @IsNotEmpty()
   password: string;
 }