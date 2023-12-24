import { BaseModel } from '@miCommon/models/base.model';

/**
 * Enrollment model representing course enrollment details.
 * This class extends the BaseModel.
 */
export class TutorPreferences extends BaseModel {
  public userId: string = '';
  public priority: string = '';
  public courseCode: string = '';
  public groupNumber: number = 0;
  public classNumber: number = 0;
  public startDate: Date = new Date();

  /**
   * Constructor to initialize Class instance.
   * @param initialData Optional partial class data to initialize the instance.
   */
  constructor(initialData?: Partial<TutorPreferences>) {
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
  private assignInitialValues(initialData?: Partial<TutorPreferences>): void {
    // Merge default values with initialData
    const mergedData: TutorPreferences = {
      ...this,
      ...initialData,
    } as TutorPreferences;

    // Assign mergedData to properties
    Object.assign(this, mergedData);
  }

  /**
   * Configure listProperties and formProperties arrays.
   */
  private configureProperties(): void {
    this.listProperties = [
      'userId',
      'courseCode',
      'groupNumber',
      'classNumber',
      'startDate',
    ];
    this.formProperties = [
      'id',
      'userId',
      'priority',
      'courseCode',
      'groupNumber',
      'classNumber',
      'startDate',
    ];
  }
}
