/**
 * Skill interface representing the required teaching skills for a class.
 */
export interface ISkill {
  id: string;
  name: string;
  description: string;
}

/**
 * TeachingSkills interface representing an array of required skills for a class.
 */
export interface ITeachingSkills {
  skills: ISkill[];
}
