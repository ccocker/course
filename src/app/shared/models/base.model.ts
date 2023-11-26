import { toSentenceCase, toSnakeCase, pluralize } from '../helpers/utils';
import {
  createFormConfiguration,
  IFormConfiguration,
} from '../helpers/form-configuration';

/**
 * Abstract base class for the application's models.
 * Contains properties and methods shared by all models.
 */
export abstract class BaseModel {
  id: string = '';
  miId: string = '';
  createdAtDate: number = 0;
  listProperties: string[] = [];
  formProperties: string[] = [];
  formConfiguration: Record<string, IFormConfiguration> = {};
  collectionName: string;
  defaultSortField!: string;
  sortOrderAscending!: boolean;
  /**
   * Constructor for the BaseModel class.
   * Initializes the instance properties and generates the form configuration.
   * @param initialData Optional initial data for the model.
   * @param collectionName Optional custom collection name.
   */
  constructor(initialData?: Partial<BaseModel>, collectionName?: string) {
    if (initialData) {
      Object.assign(this, initialData);
    }

    // Derive the collection name by pluralizing the class name
    this.collectionName =
      collectionName || pluralize(toSnakeCase(this.constructor.name).slice(1));

    // Generate the form configuration
    const properties: string[] =
      this.listProperties.length > 0
        ? this.listProperties
        : Object.keys(this).filter(
            (property: string) =>
              ![
                'listProperties',
                'formProperties',
                'formConfiguration',
                'collectionName',
              ].includes(property)
          );

    this.createFormConfiguration(properties);
  }

  getDisplayNames(): { property: string; label: string }[] {
    const propertiesToDisplay = this.listProperties.length
      ? this.listProperties
      : Object.keys(this.formConfiguration);

    // Generate display names with proper formatting
    const displayNames = propertiesToDisplay.map((property) => {
      const label = this.formConfiguration[property]?.label ?? property;
      const capitalizedLabel = toSentenceCase(label);

      return {
        property,
        label: capitalizedLabel,
      };
    });

    return displayNames;
  }

  /**
   * Creates form configuration for the provided properties using the helper function.
   * @param properties An array of property names.
   * @param specificConfig Optional specific form configuration to merge.
   */
  protected createFormConfiguration(
    properties: string[],
    specificConfig?: Record<string, IFormConfiguration>
  ) {
    const baseConfig = createFormConfiguration(properties, this);
    this.formConfiguration = { ...baseConfig, ...specificConfig };
  }
}
