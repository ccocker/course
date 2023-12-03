import { BaseModel } from './base.model';
import { IAddress, IPhone, IEmail, IDate } from '../interfaces/';
import { IFormConfiguration } from '../helpers/form-configuration';
import { IOrganisation } from '../interfaces/IOrganization';

/**
 * Organisation class representing an organisation and their related information.
 * This class extends the BaseModel.
 */
export class Organisation extends BaseModel implements IOrganisation {
  name: string = '';
  active: boolean = true;
  addresses: IAddress[] = [{ label: '', address: '' }];
  phoneNumbers: IPhone[] = [{ label: '', country: '', number: '' }];
  emails: IEmail[] = [{ label: '', address: '' }];
  dates: IDate[] = [];
  notes: string[] = [];
  tags: string[] = [];

  /**
   * Constructor to initialize Organisation instance.
   * @param initialData Optional partial data to initialize the instance.
   */
  constructor(initialData?: Partial<Organisation>) {
    super(initialData ?? {});
    this.defaultSortField = 'name';
    this.sortOrderAscending = true;
    this.assignInitialValues(initialData);
    this.configureProperties();
    this.createFormConfiguration(
      this.formProperties,
      this.getSpecificFormConfig()
    );
  }

  /**
   * Assign initial values to Organisation instance properties.
   * @param initialData Optional partial data to merge with default values.
   */
  private assignInitialValues(initialData?: Partial<Organisation>): void {
    // Merge default values with initialData
    const mergedData: Organisation = {
      ...this,
      ...initialData,
    } as Organisation;

    // Assign mergedData to properties
    Object.assign(this, mergedData);
  }

  /**
   * Configure listProperties and formProperties arrays.
   */
  private configureProperties(): void {
    this.listProperties = ['id', 'name', 'active', 'tags'];
    this.formProperties = [
      'id',
      'name',
      'customerCode',
      'active',
      'addresses',
      'phoneNumbers',
      'emails',
      'dates',
      'notes',
      'tags',
    ];
  }

  /**
   * Get specific form configuration for Organisation class.
   * @returns The specific form configuration.
   */
  private getSpecificFormConfig(): Record<string, IFormConfiguration> {
    return {
      id: { required: false, label: 'Id', type: 'text' },
      name: { required: true, label: 'Name', type: 'text' },
      active: { required: false, label: 'Active', type: 'checkbox' },
      addresses: {
        required: false,
        label: 'Addresses',
        type: 'array',
        default: { label: '', address: '' },
        fields: {
          label: { required: false, label: 'Label', type: 'text' },
          address: { required: false, label: 'Address', type: 'text' },
        },
      },
      phoneNumbers: {
        required: false,
        label: 'Phones',
        type: 'array',
        default: { label: '', country: '', number: '' },
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
        default: { label: '', address: '' },
        fields: {
          label: { required: false, label: 'Label', type: 'text' },
          address: { required: false, label: 'Email', type: 'text' },
        },
      },
      dates: {
        required: false,
        label: 'Dates',
        type: 'array',
        default: { label: '', date: '' },
        fields: {
          label: { required: false, label: 'Label', type: 'text' },
          date: { required: false, label: 'Date', type: 'date' },
        },
      },
      notes: { required: false, label: 'Notes', type: 'text' },
      tags: {
        required: false,
        label: 'Tags',
        type: 'array',
        default: { label: '' },
        fields: {
          label: { required: false, label: 'Label', type: 'text' },
        },
      },
    };
  }
}
