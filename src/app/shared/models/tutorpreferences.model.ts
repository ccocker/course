import { BaseModel } from '@miCommon/models/base.model';

/**
 * Enrollment model representing course enrollment details.
 * This class extends the BaseModel.
 */
export class Tutorpreferences extends BaseModel {
  public userId: string = '';
  public eventId: string = '';
  public classCode: string = '';
  public priority: string = '';

  /**
   * Constructor to initialize Class instance.
   * @param initialData Optional partial class data to initialize the instance.
   */
  constructor(initialData?: Partial<Tutorpreferences>) {
    super(initialData ?? {});
    this.defaultSortField = 'userId';
    this.sortOrderAscending = true;
    this.assignInitialValues(initialData);
    this.configureProperties();
    this.createFormConfiguration(this.formProperties);
  }

  /**
   * Assign initial values to Class instance properties.
   * @param initialData Optional partial class data to merge with default values.
   */
  private assignInitialValues(initialData?: Partial<Tutorpreferences>): void {
    // Merge default values with initialData
    const mergedData: Tutorpreferences = {
      ...this,
      ...initialData,
    } as Tutorpreferences;

    // Assign mergedData to properties
    Object.assign(this, mergedData);
  }

  /**
   * Configure listProperties and formProperties arrays.
   */
  private configureProperties(): void {
    this.listProperties = ['userId', 'classCode', 'priority'];
    this.formProperties = ['eventId', 'userId', 'classCode', 'priority'];
  }
}
