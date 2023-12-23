import { Injectable } from '@angular/core';
import { Person } from '../models';
import { IPermission } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  hasPermission(user: Person, requiredPermission: IPermission): boolean {
    return user.userDetail.roles.some((role) =>
      role.permissions.some(
        (permission) =>
          permission.action === requiredPermission.action &&
          permission.scope === requiredPermission.scope
      )
    );
  }
}
