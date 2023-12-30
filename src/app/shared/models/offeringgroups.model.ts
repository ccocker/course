import { BaseModel } from '@miCommon/models/base.model';
import { IOfferingGroup } from '../../course-schedule/interfaces/schedule.interface';

/**
 * OfferingGroup model representing a group of offerings, including group capacity.
 * This class extends the BaseModel.
 */
export class OfferingGroup extends BaseModel implements IOfferingGroup {
  public offeringCode: any = null;
  public leadCode: any = null;
  public group: number = 0;
  public groupCapacity: number = 0;

  /**
   * Constructor to initialize Class instance.
   * @param initialData Optional partial class data to initialize the instance.
   */
  constructor(initialData?: Partial<OfferingGroup>) {
    super(initialData ?? {});
    this.defaultSortField = 'group';
    this.sortOrderAscending = true;
    this.assignInitialValues(initialData);
    this.configureProperties();
    this.createFormConfiguration(this.formProperties);
  }

  /**
   * Assign initial values to Class instance properties.
   * @param initialData Optional partial class data to merge with default values.
   */
  private assignInitialValues(initialData?: Partial<OfferingGroup>): void {
    // Merge default values with initialData
    const mergedData: OfferingGroup = {
      ...this,
      ...initialData,
    } as OfferingGroup;

    // Assign mergedData to properties
    Object.assign(this, mergedData);
  }

  /**
   * Configure listProperties and formProperties arrays.
   */
  private configureProperties(): void {
    this.listProperties = [
      'offeringCode',
      'leadCode',
      'group',
      'groupCapacity',
    ];
    this.formProperties = [
      'id',
      'offeringCode',
      'leadCode',
      'group',
      'groupCapacity',
    ];
  }
}
