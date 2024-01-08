import { BaseModel } from './base.model';
import {
  IPerson,
  IAddress,
  IPhone,
  IEmail,
  IQualification,
  IDate,
  IRole,
} from '@miCommon/interfaces/';
import { Gender } from '@miCommon/enums';
import { IFormConfiguration } from '@miCommon/helpers/form-configuration';
/**
 * Person class representing a person and their related information.
 * This class extends the BaseModel and implements the IPerson interface.
 */
export class Person extends BaseModel {
  firstName: string = '';
  lastName: string = '';
  age: number = 0;
  avatar: string = '';
  banner: string = '';
  active: boolean = false;
  addresses: IAddress[] = [{ label: '', address: '' }];
  phoneNumbers: IPhone[] = [{ label: '', country: '', number: '' }];
  emails: IEmail[] = [{ label: '', address: '' }];
  qualifications: IQualification[] = [
    { label: '', description: '', expiry: new Date() },
  ];
  dates: IDate[] = [{ label: '', date: new Date() }];
  company: string = '';
  notes: string[] = [''];
  tags: string[] = [''];
  gender: Gender = Gender.PreferNotToSay;
  userDetail: {
    userName: string;
    userRole: string;
    userEmail: string;
    roles: IRole[];
  } = {
    userName: '',
    userRole: '',
    userEmail: '',
    roles: [],
  };
  maximumHours: number = 0;

  /**
   * Constructor to initialize Person instance.
   * @param initialData Optional partial IPerson data to initialize the instance.
   */
  constructor(initialData?: Partial<IPerson>) {
    super(initialData ?? {});
    this.defaultSortField = 'firstName';
    this.sortOrderAscending = true;
    this.assignInitialValues(initialData);
    this.configureProperties();
    this.createFormConfiguration(
      this.formProperties,
      this.getSpecificFormConfig()
    );
  }

  /**
   * Assign initial values to Person instance properties.
   * @param initialData Optional partial IPerson data to merge with default values.
   */
  private assignInitialValues(initialData?: Partial<IPerson>): void {
    // Merge default values with initialData
    const mergedData: Person = { ...this, ...initialData } as Person;

    // Assign mergedData to properties
    Object.assign(this, mergedData);
    this.userDetail = initialData?.userDetail ?? this.userDetail;
  }

  /**
   * Configure listProperties and formProperties arrays.
   */
  private configureProperties(): void {
    this.listProperties = ['firstName', 'lastName', 'emails', 'maximumHours'];
    this.formProperties = [
      'id',
      'firstName',
      'lastName',
      'maximumHours',
      'age',
      'gender',
      'active',
      'addresses',
      'phoneNumbers',
      'emails',
      'dates',
      'company',
      'notes',
    ];
  }

  /**
   * Get specific form configuration for ConditionalGuarantee class.
   * @returns The specific form configuration.
   */
  private getSpecificFormConfig(): Record<string, IFormConfiguration> {
    return {
      id: { required: false, label: 'Id', type: 'text' },
      firstName: { required: false, label: 'First Name', type: 'text' },
      lastName: { required: false, label: 'Last Name', type: 'text' },
      age: { required: false, label: 'Age', type: 'text' },
      gender: { required: false, label: 'Gender', type: 'text' },
      active: { required: false, label: 'Active', type: 'checkbox' },
      addresses: {
        required: false,
        label: 'Addresses',
        type: 'array',
        default: { label: '', address: '' }, // Default data for a new array item
        fields: {
          label: { required: false, label: 'Label', type: 'text' },
          address: { required: false, label: 'Address', type: 'text' },
        },
      },
      phoneNumbers: {
        required: false,
        label: 'Phones',
        type: 'array',
        default: { label: '', country: '', number: '' }, // Default data for a new array item
        fields: {
          label: { required: false, label: 'Label', type: 'text' },
          country: { required: false, label: 'Country', type: 'text' },
          number: { required: false, label: 'Phone', type: 'text' },
        },
      },
      emails: {
        required: false,
        label: 'Emails',
        type: 'array',
        default: { label: '', address: '' }, // Default data for a new array item
        fields: {
          label: { required: false, label: 'Label', type: 'text' },
          address: { required: false, label: 'Email', type: 'text' },
        },
      },

      dates: {
        required: false,
        label: 'Dates',
        type: 'array',
        default: { label: '', date: '' }, // Default data for a new array item
        fields: {
          label: { required: false, label: 'Label', type: 'text' },
          date: { required: false, label: 'Date', type: 'date' },
        },
      },
      company: { required: false, label: 'Company', type: 'text' },
      notes: { required: false, label: 'Notes', type: 'text' },
      userDetail: {
        required: false,
        label: 'User Details',
        type: 'object',
        fields: {
          userName: { required: false, label: 'User Name', type: 'text' },
          userRole: { required: false, label: 'User Role', type: 'text' },
          userEmail: { required: false, label: 'User Email', type: 'text' },
        },
      },
    };
  }
}
