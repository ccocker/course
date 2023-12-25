export interface IPermission {
  action: string; // e.g., 'add', 'edit', 'view'
  scope: string; // e.g., 'article', 'user'
}

export interface IRole {
  name: string;
  permissions: IPermission[];
}
