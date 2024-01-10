import { IAddress } from './IAddress';
import { IPhone } from './IPhone';
import { IEmail } from './IEmail';
import { IDate } from './IDate';

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
