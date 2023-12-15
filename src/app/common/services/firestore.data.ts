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
} from 'firebase/firestore';

import { hasUndefinedProperties } from '../helpers/undefined-properties';
import { Observable, from, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FirestoreDataService {
  private app = initializeApp(environment.firebaseConfig);
  private firestore = getFirestore(this.app);
  private totalRecordsUpdated = 0;

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

  // Creates a new entity in a Firestore collection
  public async createEntity<T extends { id: string }>(
    collectionPath: string,
    entity: Omit<T, 'id'>
  ): Promise<void> {
    if (hasUndefinedProperties(entity)) {
      throw new Error('Data contains undefined properties');
    }
    const collRef = collection(this.firestore, collectionPath);
    await addDoc(collRef, entity);
  }

  // Updates an existing entity in a Firestore collection
  public async updateEntity<T extends { id: string }>(
    collectionPath: string,
    entity: T
  ): Promise<void> {
    if (hasUndefinedProperties(entity)) {
      throw new Error('Data contains undefined properties');
    }
    const docRef = doc(this.firestore, collectionPath, entity.id);
    await updateDoc(docRef, entity);
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
}
