import { Location, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  ReactiveFormsModule,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

/**
 * DynamicFormComponent for rendering Angular Material forms dynamically based on form groups.
 */
@Component({
  selector: 'mi-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgIf,
    JsonPipe,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
})
export class DynamicFormComponent implements OnInit {
  @Input() formConfiguration: any;
  @Input() formGroupData: any;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() deleteRecord = new EventEmitter<any>();

  public formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private location: Location) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.formGroup = this.createFormGroup(this.formConfiguration);
  }

  /**
   * Wrapper for Object.keys to use in template.
   * @param obj - The object.
   * @returns Array of object keys.
   */
  public objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  /**
   * Handles form submission.
   */
  public onSubmit(): void {
    this.formSubmit.emit(this.formGroup.value);
  }

  /**
   * Handles record deletion
   */
  public onDelete(): void {
    const idValue = this.formGroup.get('id').value; // Get the id value from the form
    this.deleteRecord.emit(idValue); // Emit only the id value
  }

  /**
   * Adds a new array item to the specified FormArray.
   * @param arrayName - The name of the FormArray.
   */
  public addArrayItem(arrayName: string): void {
    const array = this.formGroup.get(arrayName) as FormArray;
    const defaultData = this.formConfiguration[arrayName]?.default;

    if (defaultData) {
      array.push(this.fb.group(defaultData));
    } else {
      console.error(`Default data for array ${arrayName} is not provided`);
    }
  }

  /**
   * Removes an array item from the specified FormArray.
   * @param arrayName - The name of the FormArray.
   * @param index - The index of the array item to remove.
   */
  public removeArrayItem(arrayName: string, index: number): void {
    const array = this.formGroup.get(arrayName) as FormArray;
    array.removeAt(index);
  }

  /**
   * Creates a form group from configuration.
   * @param config - The form configuration.
   * @returns A FormGroup object.
   */
  private createFormGroup(config: any): FormGroup {
    if (!config || typeof config !== 'object') {
      console.error('Invalid config provided to createFormGroup', config);
      return this.fb.group({});
    }

    const group: any = {};
    Object.keys(config).forEach((key) => {
      if (!config[key]) {
        console.warn(
          `Config key '${key}' is undefined or null in form configuration`,
          config
        );
      } else if (config[key].type === 'array') {
        const dataArray = this.formGroupData[key] ?? [];
        group[key] = this.fb.array(
          dataArray.map((data: any) =>
            typeof data === 'object'
              ? this.fb.group(data)
              : new FormControl(data)
          )
        );
      } else if (config[key].type === 'object' && key === 'patternTemplate') {
        const formGroup: any = {};
        const patternData = this.formGroupData[key] ?? {};
        Object.keys(patternData).forEach((subKey) => {
          formGroup[subKey] = this.fb.array(
            patternData[subKey].map((x: any) => new FormControl(x))
          );
        });
        group[key] = this.fb.group(formGroup);
      } else {
        group[key] = new FormControl(this.formGroupData[key] || null);
      }
    });

    return this.fb.group(group);
  }

  /**
   * Adds a new array to the specified object.
   * @param objectName - The name of the object within formGroup.
   */
  public addNewArrayToObject(objectName: string): void {
    const objectControl = this.formGroup.get(objectName) as FormGroup;
    const currentKeys = Object.keys(objectControl.controls);
    const currentNumbers = currentKeys.map(Number);
    const maxNumber = Math.max(0, ...currentNumbers.filter(Number.isFinite));
    const newNumber = (maxNumber + 1).toString();

    objectControl.addControl(newNumber, this.fb.array([new FormControl(1)]));
  }

  /**
   * Removes an existing array from the specified object.
   * @param objectName - The name of the object within formGroup.
   * @param arrayName - The name of the array to remove.
   */
  public removeArrayFromObject(objectName: string, arrayName: string): void {
    const objectControl = this.formGroup.get(objectName) as FormGroup;
    objectControl.removeControl(arrayName);
  }

  /**
   * Adds a new FormControl with a value of 0 to an existing FormArray within a FormGroup.
   * @param formGroupName - The name of the FormGroup to which the new FormControl will be added.
   * @param index - The key corresponding to the FormArray within the FormGroup.
   */
  public addNewItemToObjectArray(formGroupName: string, index: any): void {
    const targetFormGroup = this.formGroup.get(formGroupName) as FormGroup;

    if (targetFormGroup) {
      const targetFormArray = targetFormGroup.get(
        index.toString()
      ) as FormArray;
      if (targetFormArray) {
        const newFormControl = new FormControl(0);
        targetFormArray.push(newFormControl);
      } else {
        console.error(`The element at key ${index} is not a FormArray.`);
      }
    } else {
      console.error(`The element at key ${formGroupName} is not a FormGroup.`);
    }
  }

  /**
   * Removes an item from a specific array within an object in the form group.
   * @param objectName - The name of the object within the form group.
   * @param arrayName - The name of the array within the object.
   * @param index - The index of the item to remove from the array.
   */
  public removeItemFromObjectArray(
    objectName: string,
    arrayName: string,
    index: number
  ): void {
    const objectControl = this.formGroup.get(objectName) as FormGroup;
    const arrayControl = objectControl.get(arrayName) as FormArray;
    arrayControl.removeAt(index);
  }

  getControls(key: string): AbstractControl[] {
    const control = this.formGroup.get(key);
    return control instanceof FormArray ? control.controls : [];
  }

  getFormControl(key: string, subKey: string, index: number): FormControl {
    const control = (this.formGroup.get(key) as FormGroup).get(
      subKey
    ) as FormArray;
    return control.at(index) as FormControl;
  }

  goBack() {
    this.location.back();
  }
}
