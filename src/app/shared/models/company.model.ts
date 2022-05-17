import * as buffer from "buffer";

export class Company {
  name: string;
  owner: number;
  documents: Document[];
}

export class Document {
  content: string;
  typeId: number;
  statusId: number;
}

export class FullCompanyModel {
  blocked: boolean;
  CreatedAt: string;
  UpdatedAt: string;
  deletedAt: {
    time: string,
    valid: true
  };
  documents: [
    {
      companyID: number;
      content: string;
      CreatedAt: string;
      deletedAt: {
        time: string,
        valid: boolean
      },
      id: number;
      statusId: number;
      typeId: number;
      updatedAt: string;
      typeName: string;
    }
  ];
  id: number;
  inviteCode: string;
  moderated: boolean;
  name: string;
  owner: number;
  updatedAt: string;
  workers: [
    {
      accountW: number;
      companyID: number;
      createdAt: string;
      deletedAt: {
        time: string;
        valid: boolean;
      },
      id: number;
      updatedAt: string;
    }
  ]
}
