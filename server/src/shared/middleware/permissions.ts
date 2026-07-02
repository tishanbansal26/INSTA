export const RolePermissions: Record<string, string[]> = {
  ADMIN: [
    "Policy.Create", "Policy.Read", "Policy.Update", "Policy.Delete",
    "Client.Create", "Client.Read", "Client.Update", "Client.Delete", "Client.Export",
    "Company.Manage", "Dashboard.View", "Reports.Export"
  ],
  MANAGER: [
    "Policy.Create", "Policy.Read", "Policy.Update",
    "Client.Create", "Client.Read", "Client.Update", "Client.Export",
    "Dashboard.View", "Reports.Export"
  ],
  AGENT: [
    "Policy.Create", "Policy.Read",
    "Client.Create", "Client.Read", "Client.Update",
    "Dashboard.View"
  ]
};

export const hasPermission = (userRole: string, requiredPermission: string): boolean => {
  const permissions = RolePermissions[userRole] || [];
  return permissions.includes(requiredPermission);
};
