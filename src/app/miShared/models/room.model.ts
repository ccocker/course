import { BaseModel } from '@miCommon/models/base.model';
import { IRoom } from '../../course-schedule/interfaces/schedule.interface';

/**
 * Room model representing a specific room, including building number, floor, and capacity.
 * This class extends the BaseModel.
 */
export class Room extends BaseModel implements IRoom {
  public buildingNo: number = 0;
  public floor: number = 0;
  public roomNumber: number = 0;
  public capacity: number = 0;

  /**
   * Constructor to initialize Class instance.
   * @param initialData Optional partial class data to initialize the instance.
   */
  constructor(initialData?: Partial<Room>) {
    super(initialData ?? {});
    this.defaultSortField = 'roomNumber';
    this.sortOrderAscending = true;
    this.assignInitialValues(initialData);
    this.configureProperties();
    this.createFormConfiguration(this.formProperties);
  }

  /**
   * Assign initial values to Class instance properties.
   * @param initialData Optional partial class data to merge with default values.
   */
  private assignInitialValues(initialData?: Partial<Room>): void {
    // Merge default values with initialData
    const mergedData: Room = { ...this, ...initialData } as Room;

    // Assign mergedData to properties
    Object.assign(this, mergedData);
  }

  /**
   * Configure listProperties and formProperties arrays.
   */
  private configureProperties(): void {
    this.listProperties = ['buildingNo', 'floor', 'roomNumber', 'capacity'];
    this.formProperties = [
      'id',
      'buildingNo',
      'floor',
      'roomNumber',
      'capacity',
    ];
  }
}
