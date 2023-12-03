import { IAddress, IPhone, IEmail, IDate } from '../interfaces/';

export interface IOrganisation {
  id?: string; // Assuming there's an 'id' property for identification
  name: string;
  customerCode: string;
  active: boolean;
  addresses: IAddress[];
  phoneNumbers: IPhone[];
  emails: IEmail[];
  dates: IDate[];
  notes: string;
  tags: string[];
}
