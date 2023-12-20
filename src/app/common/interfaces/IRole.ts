interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

interface Permission {
  id: number;
  name: string;
  description: string;
}

// Example usage
const adminRole: Role = {
  id: 1,
  name: 'Admin',
  permissions: [
    { id: 1, name: 'create-user', description: 'Create a new user' },
    { id: 2, name: 'delete-user', description: 'Delete an existing user' },
    // ... other permissions
  ],
};

const userRole: Role = {
  id: 2,
  name: 'User',
  permissions: [
    // ... user-specific permissions
  ],
};
