import { ITeachingSkills } from './teaching-skills.interface';

export interface ICourse {
  name: string;
  description: string;
  code: string;
  color: string;
  groups: string[];
  teachingSkills: ITeachingSkills[];
  startDate: Date;
  endDate: Date;
  coordinator: string;
}
