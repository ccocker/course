import { IAddress, IPhone, IEmail, IDate } from '../interfaces/';

export interface IOrganisation {
  id?: string;
  name: string;
  active: boolean;
  addresses: IAddress[];
  phoneNumbers: IPhone[];
  emails: IEmail[];
  dates: IDate[];
  notes: string[];
  tags: string[];
}
