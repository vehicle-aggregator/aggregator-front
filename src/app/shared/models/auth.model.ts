export interface User {
  _id: string;
  token: string;
  firstName: string;
  lastName: string;
  middlename?: string;
  email: string;
  birthday?: Date;
  CreatedAt: Date;
  DeletedAt: Date;
  ID: number;
  UpdatedAt: Date;
  Workers: any;
  gender: Gender;
  last_name: string;
  middle_name: string;
  name: string;
}

export interface RegisterCredentials {
  _id: string;
  firstName: string;
  lastName: string;
  middlename: string;
  email: string;
  birthday: Date;
  gender: 'male' | 'female' | 'neutral';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RestoreConfirmCredentials {
  password: string;
  code: string;
}

export interface RestoreCredentials {
  email: string;
}

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
  Invited = 'invited'
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  roleId: string;
}

export interface UpdateUserModel {
  firstName:string;
  lastName: string;
  phoneNumber: string;
  icon: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Neutral = 'neutral'
}
