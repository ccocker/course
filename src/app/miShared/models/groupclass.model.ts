import { BaseModel } from '@miCommon/models/base.model';
import {
  IGroupClasses,
  DayOfWeek,
  ITimeslot,
} from '../../course-schedule/interfaces/schedule.interface';

/**
 * GroupClasses model representing a specific instance of a group class, including staff codes and timeslot.
 * This class extends the BaseModel.
 */
export class Groupclass extends BaseModel implements IGroupClasses {
  public offeringGroupCode: any = null;
  public roomCode: string = '';
  public leadCode: any = null;
  public staffCodes: string[] = [];
  public classNumber: number = 0;
  public day: DayOfWeek;
  public timeslot: ITimeslot;

  /**
   * Constructor to initialize Class instance.
   * @param initialData Optional partial class data to initialize the instance.
   */
  constructor(initialData?: Partial<Groupclass>) {
    super(initialData ?? {});
    this.defaultSortField = 'classNumber';
    this.sortOrderAscending = true;
    this.assignInitialValues(initialData);
    this.configureProperties();
    this.createFormConfiguration(this.formProperties);
  }

  /**
   * Assign initial values to Class instance properties.
   * @param initialData Optional partial class data to merge with default values.
   */
  private assignInitialValues(initialData?: Partial<Groupclass>): void {
    // Merge default values with initialData
    const mergedData: Groupclass = { ...this, ...initialData } as Groupclass;

    // Assign mergedData to properties
    Object.assign(this, mergedData);
  }

  /**
   * Configure listProperties and formProperties arrays.
   */
  private configureProperties(): void {
    this.listProperties = [
      'offeringGroupCode',
      'roomCode',
      'leadCode',
      'staffCodes',
      'classNumber',
      'day',
      'timeslot',
    ];
    this.formProperties = [
      'id',
      'offeringGroupCode',
      'roomCode',
      'leadCode',
      'staffCodes',
      'classNumber',
      'day',
      'timeslot',
    ];
  }
}
