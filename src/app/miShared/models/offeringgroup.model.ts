import { BaseModel } from '@miCommon/models/base.model';
import { IOfferingGroup } from '@miApp/components/course-schedule/interfaces/schedule.interface';

/**
 * OfferingGroup model representing a group of offerings, including group capacity.
 * This class extends the BaseModel.
 */
export class Offeringgroup extends BaseModel implements IOfferingGroup {
  public offeringCode: any = null;
  public leadName: string = '';
  public group: number = 0;
  public groupCapacity: number = 0;

  /**
   * Constructor to initialize Class instance.
   * @param initialData Optional partial class data to initialize the instance.
   */
  constructor(initialData?: Partial<Offeringgroup>) {
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
  private assignInitialValues(initialData?: Partial<Offeringgroup>): void {
    // Merge default values with initialData
    const mergedData: Offeringgroup = {
      ...this,
      ...initialData,
    } as Offeringgroup;

    // Assign mergedData to properties
    Object.assign(this, mergedData);
  }

  /**
   * Configure listProperties and formProperties arrays.
   */
  private configureProperties(): void {
    this.listProperties = [
      'offeringCode',
      'leadName',
      'group',
      'groupCapacity',
    ];
    this.formProperties = [
      'id',
      'offeringCode',
      'leadName',
      'group',
      'groupCapacity',
    ];
  }
}
