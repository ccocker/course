import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  DataAnalysisService,
  AnalysisResult,
} from '@miCommon/services/data-analysis.service';
import { MatOptionModule } from '@angular/material/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'mi-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    NgFor,
    MatOptionModule,
    NgIf,
  ],
})
export class DataAnalysisComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() data: any[] = [];

  arrayProperties: string[] = [];
  selectedProperty!: string;
  analysisResult!: AnalysisResult;

  constructor(private dataAnalysisService: DataAnalysisService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.data = changes['data'].currentValue;
      this.arrayProperties = this.getArrayProperties(this.data);
      if (!this.selectedProperty && this.arrayProperties.length > 0) {
        this.selectedProperty = this.arrayProperties[0];
        this.onPropertySelected();
      }
    }
  }

  onPropertySelected(): void {
    const selectedData = this.data.map((item) => item[this.selectedProperty]);
    // this.analysisResult = this.dataAnalysisService.analyzeData(selectedData);
  }

  private getArrayProperties(data: any[]): string[] {
    if (!data || data.length === 0) {
      return [];
    }
    return Object.keys(data[0]).filter((key) => Array.isArray(data[0][key]));
  }
}
