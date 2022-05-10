export class User {
  BusinessUser: BusinessUser[];
  CreatedAt: Date;
  DeletedAt: Date;
  ID: number;
  UpdatedAt: Date;
  birthday: Date;
  email: string;
  gender: string;
  last_name: string;
  middle_name: string;
  name: string;
  password: string;
}

export class BusinessUser {
  Ban: boolean;
  CreatedAt: Date;
  DeletedAt: Date;
  ID: number;
  Uid: number;
  UpdatedAt: Date;
}
