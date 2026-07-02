const fs = require('fs');
const path = require('path');

const dirs = [
  "src/app", "src/assets", "src/components/common", "src/components/layout",
  "src/hooks", "src/lib", "src/providers", "src/routes", "src/services",
  "src/store", "src/types", "src/utils",
  "src/modules/auth/components", "src/modules/auth/pages", "src/modules/auth/hooks",
  "src/modules/dashboard/components", "src/modules/dashboard/pages", "src/modules/dashboard/hooks",
  "src/modules/clients/components", "src/modules/clients/pages", "src/modules/clients/hooks",
  "src/modules/companies/components", "src/modules/companies/pages", "src/modules/companies/hooks",
  "src/modules/plans/components", "src/modules/plans/pages", "src/modules/plans/hooks",
  "src/modules/premium/components", "src/modules/premium/pages", "src/modules/premium/hooks",
  "src/modules/quotation/components", "src/modules/quotation/pages", "src/modules/quotation/hooks",
  "src/modules/policy/components", "src/modules/policy/pages", "src/modules/policy/hooks",
  "src/modules/payments/components", "src/modules/payments/pages", "src/modules/payments/hooks",
  "src/modules/documents/components", "src/modules/documents/pages", "src/modules/documents/hooks",
  "src/modules/renewals/components", "src/modules/renewals/pages", "src/modules/renewals/hooks",
  "src/modules/reports/components", "src/modules/reports/pages", "src/modules/reports/hooks",
  "src/modules/settings/components", "src/modules/settings/pages", "src/modules/settings/hooks"
];

dirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

console.log("Directories created.");
