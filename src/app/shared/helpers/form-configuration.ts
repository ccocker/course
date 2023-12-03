import { getPropertyType, toSentenceCase } from '../helpers/utils';

export interface IFormConfiguration {
  required?: boolean;
  label: string;
  type: 'text' | 'date' | 'checkbox' | 'select' | 'array' | 'number' | 'object';
  fields?: Record<string, IFormConfiguration>;
  default?: any;
}

/**
 * Creates form configuration for the provided properties.
 * @param properties An array of property names.
 * @param instance The instance of the model.
 */
export function createFormConfiguration<T>(
  properties: string[],
  instance: T
): Record<string, IFormConfiguration> {
  const formConfiguration: Record<string, IFormConfiguration> = {};

  properties.forEach((property: string) => {
    formConfiguration[property] = {
      required: false,
      label: toSentenceCase(property),
      type: getPropertyType((instance as any)[property], property),
    };
  });

  return formConfiguration;
}
