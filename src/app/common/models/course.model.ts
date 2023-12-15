import { BaseModel } from '../../shared/models/base.model';
import {
  ICourse,
  ISkill,
  IStaff,
} from '../../course-schedule/interfaces/schedule.interface';
import { ITeachingSkills } from '../../course-schedule/interfaces/schedule.interface';

/**
 * Course model representing a university course and its related information.
 * This class extends the BaseModel.
 */
export class Course extends BaseModel implements ICourse {
  public name: string = '';
  public description: string = '';
  public code: string = '';
  public color: string = '';
  public groups: string[] = [];
  public teachingSkills: any = {} as ITeachingSkills;
  public startDate: Date = new Date();
  public endDate: Date = new Date();
  public coordinator: IStaff = {} as IStaff;
  public baseColour: string = '';

  /**
   * Constructor to initialize Class instance.
   * @param initialData Optional partial class data to initialize the instance.
   */
  constructor(initialData?: Partial<Course>) {
    super(initialData ?? {});
    this.defaultSortField = 'name';
    this.sortOrderAscending = true;
    this.assignInitialValues(initialData);
    this.configureProperties();
    this.createFormConfiguration(this.formProperties);
  }

  /**
   * Assign initial values to Class instance properties.
   * @param initialData Optional partial class data to merge with default values.
   */
  private assignInitialValues(initialData?: Partial<Course>): void {
    // Merge default values with initialData
    const mergedData: Course = { ...this, ...initialData } as Course;

    // Assign mergedData to properties
    Object.assign(this, mergedData);
  }

  /**
   * Configure listProperties and formProperties arrays.
   */
  private configureProperties(): void {
    this.listProperties = [
      'name',
      'code',
      'coordinator',
      'startDate',
      'endDate',
    ];
    this.formProperties = [
      'id',
      'name',
      'description',
      'code',
      'teachingSkills',
      'startDate',
      'endDate',
      'coordinator',
    ];
  }
}
