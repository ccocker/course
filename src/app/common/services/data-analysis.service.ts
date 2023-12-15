import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataAnalysisService {
  // This method can be customized based on the type of analysis you want to do
  analyzeData(data: any[]): AnalysisResult {
    // Perform your analysis here

    // Dummy analysis, replace with your own logic
    const evenCount = data.filter((val) => val % 2 === 0).length;
    const oddCount = data.length - evenCount;

    return { evenCount, oddCount };
  }
}

export interface AnalysisResult {
  evenCount: number;
  oddCount: number;
}
