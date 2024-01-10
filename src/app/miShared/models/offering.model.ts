import { BaseModel } from '@miCommon/models/base.model';
import { IOffering } from '@miApp/components/course-schedule/interfaces/schedule.interface';

/**
 * Offering model representing a specific instance of a course offering, including start and finish dates.
 * This class extends the BaseModel.
 */
export class Offering extends BaseModel implements IOffering {
  public courseCode: string = '';
  public startDate: Date = new Date();
  public finishDate: Date = new Date();
  public teachStartDate: Date = new Date();
  public teachFinishDate: Date = new Date();

  /**
   * Constructor to initialize Class instance.
   * @param initialData Optional partial class data to initialize the instance.
   */
  constructor(initialData?: Partial<Offering>) {
    super(initialData ?? {});
    this.defaultSortField = 'courseCode';
    this.sortOrderAscending = true;
    this.assignInitialValues(initialData);
    this.configureProperties();
    this.createFormConfiguration(this.formProperties);
  }

  /**
   * Assign initial values to Class instance properties.
   * @param initialData Optional partial class data to merge with default values.
   */
  private assignInitialValues(initialData?: Partial<Offering>): void {
    // Merge default values with initialData
    const mergedData: Offering = { ...this, ...initialData } as Offering;

    // Assign mergedData to properties
    Object.assign(this, mergedData);
  }

  /**
   * Configure listProperties and formProperties arrays.
   */
  private configureProperties(): void {
    this.listProperties = [
      'courseCode',
      'startDate',
      'finishDate',
      'teachStartDate',
      'teachFinishDate',
    ];
    this.formProperties = [
      'id',
      'courseCode',
      'startDate',
      'finishDate',
      'teachStartDate',
      'teachFinishDate',
    ];
  }
}
