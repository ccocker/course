import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import * as XLSX from 'xlsx';
import { FirestoreDataService } from '@miCommon/services/firestore.data';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '@miCommon/features/confirm-dialog/confirm-dialog.component';
import { TableColumn } from '@miCommon/features/table/table.component';
import { MiTableComponent } from '../table/table.component';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

interface RowData {
  [key: string]: any;
}

@Component({
  selector: 'mi-excel-reader',
  templateUrl: './excel-reader.component.html',
  styleUrls: ['./excel-reader.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MiTableComponent,
  ],
})
export class ExcelReaderComponent implements OnInit {
  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef;
  @Input()
  set collection(value: any) {
    this._collection = value;
    this.updateCollection();
  }
  get collection(): any {
    return this._collection;
  }
  @Input() model?: any;
  tableData: Array<RowData> = [];
  @Output() data = new EventEmitter<any[]>();

  private _collection?: any;

  hasHeaderRow = true;
  deleteBeforeUpload = false; // Added deleteBeforeUpload property
  tableName = '';
  newColumnName = '';
  totalEntities: number = 10;
  tableColumns: TableColumn[] = [];
  showTable = false;

  constructor(
    private firestoreData: FirestoreDataService,
    private dialog: MatDialog
  ) {}

  /**
   * Lifecycle hook that runs when the component is initialized.
   */
  ngOnInit(): void {
    this.updateCollection();
  }

  /**
   * Sets the table name based on the provided collection or default to "TBA".
   */
  private updateCollection(): void {
    if (this.collection) {
      this.tableName = this.collection;
    } else {
      this.tableName = 'TBA';
    }
  }

  /**
   * Reads the selected Excel file and parses the data.
   * @param event The event emitted by the file input.
   */
  public readExcelFile(event: any): void {
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length !== 1) {
      throw new Error('Cannot read multiple files');
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const binaryString: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryString, {
        type: 'binary',
      });
      const sheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
      const jsonData: Array<any[]> = XLSX.utils.sheet_to_json(worksheet, {
        header: this.hasHeaderRow ? 1 : 0,
      });

      if (this.hasHeaderRow) {
        this.tableColumns = jsonData[0].map((header) => ({
          property: header.toString(),
          label: header.toString(),
        }));

        this.tableData = jsonData.slice(1).map((row) => {
          const rowData = Object.values(row);
          const rowObj: any = {};
          for (let i = 0; i < this.tableColumns.length; i++) {
            const columnLabel = this.tableColumns[i].label.toLowerCase();
            const cellValue = rowData[i];
            rowObj[this.tableColumns[i].property] = columnLabel.includes('date')
              ? this.excelDateToJSDate(cellValue)
              : cellValue !== undefined
              ? cellValue
              : ''; // If cellValue is undefined, use empty string
          }

          // If id is not present in rowObj, set it as empty string
          if (!rowObj.hasOwnProperty('id')) {
            rowObj.id = '';
          }

          return rowObj;
        });
        if (!this.hasHeaderRow) {
          const numColumns = this.tableData[0]['length'];
          const headerRow = Array.from(
            { length: numColumns },
            (_, i) => `Column ${i + 1}`
          );
          this.tableData.unshift(headerRow);
        }
      }
      this.mergeMainNumbers();
      this.showTable = this.tableData.length > 0;
      this.data.emit(this.tableData);
    };

    reader.readAsBinaryString(target.files[0]);
  }

  /**
   * Converts a date from Excel serial number format to JavaScript Date format.
   * @param serial The Excel serial number representing the date.
   * @returns The JavaScript Date object representing the same date.
   */
  excelDateToJSDate(serial: number): Date {
    const utcDays = Math.floor(serial - 25569);
    const utcValue = utcDays * 86400;
    const dateInfo = new Date(utcValue * 1000);
    const localOffset = dateInfo.getTimezoneOffset() * 60;
    const localTime = utcValue + localOffset;
    return new Date(localTime * 1000);
  }

  /**
   * Opens the file dialog to select an Excel file to upload.
   */
  openFileDialog(): void {
    this.fileInput.nativeElement.click();
  }

  private showDialog(recordsUploaded: number): void {
    const data: ConfirmDialogData = {
      title: 'Upload Successful',
      content: `${recordsUploaded} records have been uploaded.`,
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '80vw', // 80% of viewport width
      maxWidth: '800px', // Max-width of the dialog
      data: data,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.tableData = [];
    });
  }

  /**
   * Saves the table data to the specified Firestore collection.
   */
  public async saveToFirebase(): Promise<void> {
    if (!this.tableName && !this.model) {
      return;
    }

    const collectionName = this.tableName || this.model;

    try {
      // await this.firestoreData.uploadBulkData(
      //   collectionName,
      //   this.tableData,
      //   this.deleteBeforeUpload // Pass the deleteBeforeUpload flag to the uploadBulkData method
      // );
      this.tableData = [];
      this.showTable = false;
    } catch (error) {}
  }

  /**
   * Called when a column label is updated in the table.
   * @param event The event containing the updated column information.
   */
  onColumnUpdated(event: { index: number; column: TableColumn }): void {
    const oldProperty = this.tableColumns[event.index].property;
    const newProperty = event.column.label;

    if (oldProperty === newProperty) {
      return;
    }

    this.tableData = this.tableData.map((row: RowData) => {
      const newRow: RowData = {};
      for (const prop in row) {
        if (prop === oldProperty) {
          newRow[newProperty] = row[oldProperty];
        } else {
          newRow[prop] = row[prop];
        }
      }
      return newRow;
    });

    this.tableColumns[event.index] = event.column;
  }

  /**
   * Updates the tableData when the dataChanged event is emitted from the TableComponent.
   * @param newData The updated data from the TableComponent.
   */
  public onDataChanged(newData: any[]): void {
    this.tableData = newData;
  }

  /**
   * Merges properties N1, N2, N3, N4, N5, N6 into a property called 'main' and deletes the old properties.
   */
  private mergeMainNumbers(): void {
    const mainNumbersProperties = [
      'N1',
      'N2',
      'N3',
      'N4',
      'N5',
      'N6',
      'N7',
      'N8',
    ];

    const hasMainNumbersProperties = this.tableData.every((row: RowData) =>
      mainNumbersProperties.every((prop: string) => row.hasOwnProperty(prop))
    );

    if (hasMainNumbersProperties) {
      this.tableData.forEach((row: RowData) => {
        const mainNumbers = mainNumbersProperties.map(
          (prop: string) => row[prop]
        );

        row['main'] = mainNumbers;
        row['name'] = this.newColumnName; // Added name property
        mainNumbersProperties.forEach((prop: string) => delete row[prop]);
      });
    }
    this.tableData = [...this.tableData];
  }

  public addColumn(): void {
    const columnName = prompt('Please enter column name');

    if (columnName) {
      this.newColumnName = columnName;
      // Add new column
      this.tableColumns.push({
        property: columnName,
        label: columnName,
      });

      // Add new property to all rows
      this.tableData = this.tableData.map((row) => ({
        ...row,
        name: this.newColumnName,
      }));
    }
  }
}
