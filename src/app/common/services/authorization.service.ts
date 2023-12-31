import { Injectable } from '@angular/core';
import { Person } from '../models';
import { IPermission } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  hasPermission(user: Person, requiredPermission: IPermission): boolean {
    // Check if roles is an object and permissions is an array
    if (
      user.userDetail.roles &&
      Array.isArray(user.userDetail.roles['permissions'])
    ) {
      return user.userDetail.roles['permissions'].some(
        (permission) =>
          permission.action === requiredPermission.action &&
          permission.scope === requiredPermission.scope
      );
    } else {
      console.error('Invalid roles structure:', user.userDetail.roles);
      return false;
    }
  }
}
