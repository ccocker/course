import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  QueryConstraint,
  writeBatch,
  setDoc,
  where,
  CollectionReference,
  Firestore,
} from 'firebase/firestore';

import { hasUndefinedProperties } from '../helpers/undefined-properties';
import { Observable, from, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { MatDialogRef } from '@angular/material/dialog';
import { ProgressDialogComponent } from '@miCommon/components/progress-dialog/progress-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class FirestoreDataService {
  private app = initializeApp(environment.firebaseConfig);
  private firestore = getFirestore(this.app);
  private totalRecordsUpdated = 0;
  private dialogRef!: MatDialogRef<ProgressDialogComponent>;

  constructor() {}

  // Returns a reference to a Firestore collection
  public getCollectionReference<T>(collectionPath: string) {
    return collection(this.firestore, collectionPath);
  }

  // Generates a new Firestore ID
  public getNewFirestoreId(): string {
    return doc(collection(this.firestore, '_')).id;
  }

  // Fetches a single entity from a Firestore collection by its ID
  public getEntity<T extends { id: string }>(
    collectionPath: string,
    id: string
  ): Observable<T | undefined> {
    const docRef = doc(this.firestore, collectionPath, id);
    return from(getDoc(docRef)).pipe(
      map((docSnapshot) =>
        docSnapshot.exists()
          ? ({ id: docSnapshot.id, ...docSnapshot.data() } as T)
          : undefined
      )
    );
  }

  // Fetches a single entity from a Firestore collection by its ID
  public getEntities<T extends { id: string }>(
    collectionPath: string,
    orderByField?: string,
    ascending: boolean = true,
    limitCount?: number
  ): Observable<T[]> {
    let constraints: QueryConstraint[] = [];

    if (orderByField) {
      constraints.push(orderBy(orderByField, ascending ? 'asc' : 'desc'));
    }
    if (limitCount) {
      constraints.push(limit(limitCount));
    }

    const coll = collection(this.firestore, collectionPath);
    const q = query(coll, ...constraints);

    return from(getDocs(q)).pipe(
      map((querySnapshot) =>
        querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as T)
        )
      )
    );
  }

  public createEntity<T extends { id?: string }>(
    collectionPath: string,
    entity: T
  ): Observable<void> {
    // Check for undefined properties in the entity
    if (hasUndefinedProperties(entity)) {
      return throwError(() => new Error('Data contains undefined properties'));
    }

    let modifiedEntity = entity;

    // Generate a new Firestore ID if the entity doesn't have one
    if (!entity.id) {
      // Create a new object with all properties of entity and a new id
      modifiedEntity = { ...entity, id: this.getNewFirestoreId() };
    }

    const docRef = doc(this.firestore, collectionPath, modifiedEntity.id);

    // Use setDoc to create the document with the specified ID
    return from(setDoc(docRef, modifiedEntity)).pipe(
      map(() => void 0) // Maps the result to void
    );
  }

  // Updates an existing entity in a Firestore collection
  public updateEntity<T extends { id: string }>(
    collectionPath: string,
    entity: T
  ): Observable<void> {
    if (hasUndefinedProperties(entity)) {
      throw new Error('Data contains undefined properties');
    }
    const docRef = doc(this.firestore, collectionPath, entity.id);

    return from(updateDoc(docRef, entity));
  }

  // Deletes an entity from a Firestore collection
  public deleteEntity(collectionPath: string, id: string): Observable<void> {
    const docRef = doc(this.firestore, collectionPath, id);
    return from(deleteDoc(docRef));
  }

  // Deletes all records in a Firestore collection
  public async deleteAllRecords(collectionPath: string): Promise<void> {
    const collRef = collection(this.firestore, collectionPath);
    const querySnapshot = await getDocs(collRef);

    if (!querySnapshot.empty) {
      const batch = writeBatch(this.firestore);
      querySnapshot.docs.forEach((docSnapshot) => {
        batch.delete(docSnapshot.ref);
      });
      await batch.commit();
    }
  }

  public async uploadBulkData(
    collectionPath: string,
    data: any[],
    deleteBeforeUpload: boolean = false,
    skipIfKeyExists: string = ''
  ): Promise<void> {
    const db = getFirestore(this.app);
    const collRef = collection(db, collectionPath);

    if (deleteBeforeUpload) {
      await this.deleteAllRecords(collectionPath);
    }

    // Filter data if skipIfKeyExists is provided
    if (skipIfKeyExists !== '') {
      const filteredData = [];
      for (const item of data) {
        const q = query(
          collRef,
          where(skipIfKeyExists, '==', item[skipIfKeyExists])
        );
        const docSnapshots = await getDocs(q);

        if (docSnapshots.empty) {
          filteredData.push(item);
        }
      }
      data = filteredData;
    }

    // Process data in batches
    await this.processDataInBatches(db, collRef, data);
  }

  private async processDataInBatches(
    db: Firestore,
    collRef: CollectionReference,
    data: any[]
  ): Promise<void> {
    const batchSize = 500; // Adjust batch size as needed
    const batchCount = Math.ceil(data.length / batchSize);

    for (let batchIndex = 0; batchIndex < batchCount; batchIndex++) {
      const batch = writeBatch(db);
      const batchData = data.slice(
        batchIndex * batchSize,
        (batchIndex + 1) * batchSize
      );

      batchData.forEach((item) => {
        let docRef;
        if (item.id && typeof item.id === 'string' && item.id.trim() !== '') {
          // If 'id' exists, use it to create the document reference
          docRef = doc(collRef, item.id);
        } else {
          const newId = this.getNewFirestoreId(); // Assuming this method returns a unique ID
          item.id = newId; // Set the new ID as the item's ID
          docRef = doc(collRef, newId);
        }
        batch.set(docRef, item);
      });

      await batch.commit();
      // Update progress and handle any additional logic
    }
  }
}
