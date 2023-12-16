import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  DatePipe,
  NgIf,
  NgFor,
  NgClass,
  CurrencyPipe,
  CommonModule,
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import * as XLSX from 'xlsx';
import { LoadingComponent } from '@src/src/app/shared/components/loading/loading.component';

export interface TableColumn {
  property: string;
  label: string;
}

@Component({
  selector: 'mi-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [DatePipe],
  standalone: true,
  imports: [
    NgIf,
    MatButtonModule,
    MatSelectModule,
    NgFor,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    NgClass,
    FormsModule,
    MatPaginatorModule,
    CurrencyPipe,
    CommonModule,
    LoadingComponent,
  ],
})
export class MiTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() isLoading: boolean = true;
  @Input({ required: true }) columns: { property: string; label: string }[] =
    [];
  @Input({ required: true }) allowAdd: boolean = false;
  @Input({ required: true }) allowBulkUpload: boolean = false;
  @Input({ required: true }) allowDeleteColumns: boolean = false;
  @Input({ required: true }) allowMergeColumns: boolean = false;
  @Input({ required: true }) collection: string = '';
  @Input() editableColumnHeadings = false;
  @Input() data: any[] = [];
  @Input() totalColumns: string[] = [];
  @Input() allowRowActions: boolean = true;
  @Input() allowFilter: boolean = true;
  @Input() showPagination: boolean = true;

  @Output() dataChanged = new EventEmitter<any[]>();
  @Output() columnUpdated: EventEmitter<{
    index: number;
    column: TableColumn;
  }> = new EventEmitter<{ index: number; column: TableColumn }>();

  @Output() deleteRecord = new EventEmitter<{ id: string; event: Event }>();
  @Output() editableColumns = new EventEmitter<boolean>();
  @Output() emitRecord = new EventEmitter<string>();
  @Output() addRecord = new EventEmitter<void>();
  @Output() bulkUpload = new EventEmitter<void>();
  @Output() filter = new EventEmitter<string>();

  public editingAllRows = false;

  dataSource = new MatTableDataSource();
  editingRowIndexes: number[] = [];
  bulkUploadInProgress: boolean = false;
  editingColumnIndex: number | null = null;
  columnEdits: { [property: string]: string } = {};
  public editingColumnHeaders = false;
  public changedRows: { [key: string]: any } = {};
  public originalData: any[] = [];
  selectedColumns: string[] = [];
  selectedColumnsToDelete: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.dataSource.data = this.data;
    this.editableColumns.emit(this.editableColumnHeadings);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource.data = changes['data'].currentValue;
      this.originalData = JSON.parse(
        JSON.stringify(changes['data'].currentValue)
      );
      this.dataSource.sort = this.sort;
      this.dataSource._updateChangeSubscription();
    }
  }

  public getDisplayedColumnProperties(): string[] {
    return this.columns.map((column) => column.property);
  }

  public tableFilter(event: KeyboardEvent): void {
    const value = (event.target as HTMLInputElement).value;

    this.dataSource.filter = value.trim().toLowerCase();
  }

  public formatDate(column: TableColumn, value: any): string | null {
    if (column.label.toLowerCase().includes('date')) {
      if (value && value.seconds) {
        const date = new Date(value.seconds * 1000);
        return date.toISOString().substring(0, 10);
      } else {
        return this.datePipe.transform(value, 'dd MMM yyyy');
      }
    }
    return value;
  }

  public toggleRowEdit(index: number, rowId?: string): void {
    if (rowId) {
      this.emitRecord.emit(rowId);
    } else {
      const editingIndex = this.editingRowIndexes.indexOf(index);
      if (editingIndex === -1) {
        this.editingRowIndexes.push(index);
      } else {
        this.editingRowIndexes.splice(editingIndex, 1);
      }
    }
  }

  public editRecord(index: number, rowId?: string): void {
    const editingIndex = this.editingRowIndexes.indexOf(index);
    if (editingIndex === -1) {
      this.editingRowIndexes.push(index);
    } else {
      this.editingRowIndexes.splice(editingIndex, 1);
    }
  }

  public toggleEditAllRows(cancel?: boolean): void {
    if (cancel) {
      this.dataSource.data = this.originalData.map((row) =>
        Object.assign({}, row)
      );
      this.editingAllRows = false;
      return;
    }

    if (this.editingAllRows) {
      this.editingAllRows = false;
    } else {
      this.editingAllRows = true;
      this.originalData = this.dataSource.data.map((row) =>
        Object.assign({}, row)
      );
    }
  }

  public toggleColumnEdit(index: number): void {
    this.editingColumnIndex = this.editingColumnIndex === index ? null : index;
  }

  public saveRowChanges(row: any, rowId: string): void {
    this.changedRows[rowId] = row;
    this.dataChanged.emit(Object.values(this.changedRows));

    this.toggleRowEdit(-1);
  }

  public saveAllRowChanges(): void {
    const updatedRows = this.data.filter((row, index) => {
      return JSON.stringify(row) !== JSON.stringify(this.originalData[index]);
    });
    this.dataChanged.emit(updatedRows);
    this.editingAllRows = false;
    this.originalData = JSON.parse(JSON.stringify(this.data));
  }

  public saveColumnChanges(column: TableColumn, columnIndex: number): void {
    const newLabel = this.columnEdits[column.property] || column.label;
    this.updateColumn(columnIndex, column.property, newLabel);
    this.toggleColumnEdit(-1);
  }

  private updateColumn(
    columnIndex: number,
    oldProperty: string,
    newLabel: string
  ): void {
    const newProperty = newLabel.replace(/[^a-zA-Z0-9]/g, '').trim();
    const updatedColumn: TableColumn = {
      property: newProperty,
      label: newLabel,
    };
    this.columns[columnIndex] = updatedColumn;
    this.columnUpdated.emit({ index: columnIndex, column: updatedColumn });

    this.data = this.data.map((row) => {
      const newRow = { ...row };
      newRow[newProperty] = row[oldProperty];
      delete newRow[oldProperty];
      return newRow;
    });
    this.dataSource.data = this.data;
    this.dataSource._updateChangeSubscription();
    this.dataChanged.emit(this.data);
  }

  public getDisplayedColumnPropertiesWithEdit(): string[] {
    return ['editButtons', ...this.getDisplayedColumnProperties()];
  }

  public cancelColumnChanges(column: TableColumn): void {
    delete this.columnEdits[column.property];
  }

  public toggleColumnHeadersEdit(): void {
    this.editingColumnHeaders = !this.editingColumnHeaders;
  }

  public saveAllColumnChanges(): void {
    this.columns.forEach((column, columnIndex) => {
      if (this.columnEdits[column.property]) {
        this.saveColumnChanges(column, columnIndex);
      }
    });

    this.toggleColumnHeadersEdit();
  }

  public shouldShowTotal(property: string): boolean {
    return this.totalColumns.includes(property);
  }

  public getTotal(property: string): number {
    if (this.shouldShowTotal(property)) {
      const total = this.dataSource.data
        .map((t) => (t as { [key: string]: any })[property])
        .reduce(
          (acc, value) => acc + (typeof value === 'number' ? value : 0),
          0
        );
      return total;
    }
    return 0;
  }

  public isNegativeTotal(property: string): boolean {
    const total = this.getTotal(property);
    return total < 0;
  }

  public startBulkUpload(): void {
    this.bulkUpload.emit();
  }

  public columnFilter(column: string, event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const dataStr = data[column].toString().toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  promptForMergingColumns(selectedColumns: string[]): void {
    // Prompt for the new column name
    const newColumnName = prompt('Enter a name for the new column:');

    // Check if the newColumnName is not null
    if (newColumnName !== null) {
      // Copy the existing data array
      const newData = [...this.dataSource.data];

      // Merge the columns
      const mergedData = newData.map((record: any) => {
        let newRecord = { ...record };

        // Create the new array property
        newRecord[newColumnName] = this.selectedColumns.map(
          (column: string) => record[column]
        );

        // Delete the merged columns
        for (const column of this.selectedColumns) {
          delete newRecord[column];
        }

        return newRecord;
      });

      // Find the position of the first selected column
      let firstSelectedColumnPosition = this.columns.length; // default value if not found
      for (let i = 0; i < this.columns.length; i++) {
        if (this.selectedColumns.includes(this.columns[i].property)) {
          firstSelectedColumnPosition = i;
          break;
        }
      }

      // Update the MatTableDataSource with the new data array
      this.dataSource.data = mergedData;

      // Also adjust the columns array
      this.columns = this.columns.filter(
        (column) => !this.selectedColumns.includes(column.property)
      );

      // Insert new column at the original position of the first selected column
      this.columns.splice(firstSelectedColumnPosition, 0, {
        property: newColumnName,
        label: newColumnName,
      });

      this.dataSource._updateChangeSubscription();
      this.dataChanged.emit(this.dataSource.data);
      // Reset the selected columns
      this.selectedColumns = [];
    }
  }

  deleteColumns(selectedColumnsToDelete: string[]): void {
    // Make sure that columns have been selected to delete
    if (selectedColumnsToDelete.length > 0) {
      // Copy the existing data array
      const newData = [...this.dataSource.data];

      // Delete the columns from the data
      const updatedData = newData.map((record: any) => {
        let newRecord = { ...record };

        // Delete the selected columns
        for (const column of selectedColumnsToDelete) {
          delete newRecord[column];
        }

        return newRecord;
      });

      // Update the MatTableDataSource with the new data array
      this.dataSource.data = updatedData;

      // Also adjust the columns array
      this.columns = this.columns.filter(
        (column) => !selectedColumnsToDelete.includes(column.property)
      );

      this.dataSource._updateChangeSubscription();
      this.dataChanged.emit(this.dataSource.data);
      // Reset the selected columns
      this.selectedColumnsToDelete = [];
    } else {
      alert('No columns selected to delete!');
    }
  }

  isNumeric(column: any): boolean {
    if (
      this.dataSource &&
      'data' in this.dataSource &&
      Array.isArray((this.dataSource as any).data) &&
      (this.dataSource as any).data.length > 0 &&
      column.property in (this.dataSource as any).data[0]
    ) {
      const value = (this.dataSource as any).data[0][column.property];
      return typeof value === 'number';
    }
    return false;
  }
  isNumericFooter(property: string): boolean {
    if (
      this.dataSource &&
      'data' in this.dataSource &&
      Array.isArray((this.dataSource as any).data) &&
      (this.dataSource as any).data.length > 0 &&
      property in (this.dataSource as any).data[0]
    ) {
      const value = (this.dataSource as any).data[0][property];
      return typeof value === 'number';
    }
    return false;
  }

  isNegative(value: number): boolean {
    return value < 0;
  }

  public exportAsExcelFile(): void {
    // create a new workbook
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // convert the data to a worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.dataSource.data
    );

    // add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'en_AL');

    // write the workbook to a file
    XLSX.writeFile(workbook, 'en_AL.xlsx');
  }
}
