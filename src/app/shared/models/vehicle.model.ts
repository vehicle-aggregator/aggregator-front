export class VehicleTypeModel {
  CreatedAt: Date;
  DeletedAt: Date;
  ID: number;
  Name: string;
  UpdatedAt: Date;
}

export class VehicleModel {
  CategoryID: number;
  CompanyID: number;
  CreatedAt: Date;
  DeletedAt: Date;
  ID: number;
  NumberPlate: string;
  PassengerCount: number;
  Places: string;
  PlacesBus: any;
  UpdatedAt: Date;
}

export class BusPlace {
  column: number;
  raw: number;
  number?: number;
  show: boolean;
  busy?: boolean;
}
