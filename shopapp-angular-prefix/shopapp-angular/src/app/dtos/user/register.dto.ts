import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsPhoneNumber, IsNumber
} from 'class-validator';

export class RegisterDto {
  @IsString()
  fullname: string;

  @IsPhoneNumber()
  phone_number: string;

  @IsString()
  address: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  retype_password: string;

  @IsDate()
  date_of_birth: Date;
  facebook_account_id: number = 0;
  google_account_id: number = 0;
  role_id: number = 1;
  @IsString()
  avatar: string;
  constructor(data: any) {
    this.fullname = data.fullName;
    this.phone_number = data.phone_number;
    this.address = data.address;
    this.password = data.password;
    this.retype_password = data.retype_password;
    this.date_of_birth = data.date_of_birth;
    this.facebook_account_id = data.facebook_account_id || 0;
    this.google_account_id = data.google_account_id || 0;
    this.role_id = data.role_id || 1;
    this.email = data.email;
    this.avatar = data.avatar;
  }
}
