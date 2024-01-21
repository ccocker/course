import { BaseModel } from '@miCommon/models/base.model';
import { IFormConfiguration } from '@miCommon/helpers/form-configuration';

/**
 * Event class representing a calendar event.
 * This class extends the BaseModel.
 */
export class Courseschedule extends BaseModel {
  startDate: Date = new Date();
  startTime: string = '';
  endDate: Date = new Date();
  endTime: string = '';
  description: string = '';
  color: string = '';
  leadName: string = '';
  tutors: string[] = [];

  /**
   * Constructor to initialize Event instance.
   * @param initialData Optional partial data to initialize the instance.
   */
  constructor(initialData?: Partial<Courseschedule>) {
    super(initialData ?? {});
    this.assignInitialValues(initialData);
    this.configureProperties();
    this.createFormConfiguration(
      this.formProperties,
      this.getSpecificFormConfig()
    );
  }

  /**
   * Assign initial values to Event instance properties.
   * @param initialData Optional partial data to merge with default values.
   */
  private assignInitialValues(initialData?: Partial<Courseschedule>): void {
    const mergedData: Courseschedule = {
      ...this,
      ...initialData,
    } as Courseschedule;
    Object.assign(this, mergedData);
  }

  /**
   * Configure listProperties and formProperties arrays.
   */
  private configureProperties(): void {
    this.listProperties = [
      'description',
      'leadName',
      'startDate',
      'endDate',
      'color',
    ];
    this.formProperties = [
      'id',
      'description',
      'leadName',
      'startDate',
      'startTime',
      'endDate',
      'endTime',

      'color',
    ];
  }

  /**
   * Get specific form configuration for Event class.
   * @returns The specific form configuration.
   */
  private getSpecificFormConfig(): Record<string, IFormConfiguration> {
    return {
      id: { required: false, label: 'Id', type: 'text' },
      startDate: { required: true, label: 'Start Date', type: 'date' },
      startTime: { required: true, label: 'Start Time', type: 'text' },
      endDate: { required: true, label: 'End Date', type: 'date' },
      endTime: { required: true, label: 'End Time', type: 'text' },
      description: { required: false, label: 'Description', type: 'text' },
      color: { required: false, label: 'Color', type: 'text' },
    };
  }
}
