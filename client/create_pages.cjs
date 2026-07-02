const fs = require('fs');
const pages = ['CommissionList', 'ExpenseList', 'PayoutList', 'InvoiceList'];

pages.forEach(page => {
  const content = `import React from 'react';

const ${page}: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">${page.replace(/([A-Z])/g, ' $1').trim()}</h1>
      <p className="text-muted-foreground">Manage and view ${page.toLowerCase()} here.</p>
    </div>
  );
};

export default ${page};
`;
  fs.writeFileSync(`c:/Users/tisha/OneDrive/Desktop/ins - Copy/insureflow-pro/client/src/modules/finance/pages/${page}.tsx`, content);
});
console.log('Pages created successfully.');
