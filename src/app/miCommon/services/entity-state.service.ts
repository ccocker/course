import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { BaseModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class EntityStateService {
  private _currentModel = new BehaviorSubject<BaseModel | null>(null);

  constructor() {}

  public setCurrentModel(model: BaseModel): void {
    this._currentModel.next(model);
  }

  public getCurrentModel(): Observable<BaseModel | null> {
    return this._currentModel.asObservable();
  }

  public getListProperties(): Observable<string[] | null> {
    return this._currentModel.pipe(
      map((model) => model?.listProperties ?? null)
    );
  }

  public getFormConfiguration(): Observable<{ [key: string]: any } | null> {
    return this._currentModel.pipe(
      map((model) => model?.formConfiguration ?? null)
    );
  }
}
