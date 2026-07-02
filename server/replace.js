const fs = require('fs');
const glob = require('glob');
const path = require('path');

const srcDir = path.join(__dirname, 'src/modules');

// Helper to determine permission based on method and route name
function getPermission(content, match) {
  // Rough heuristic
  let perm = "Read";
  if (content.includes('router.post')) perm = "Create";
  if (content.includes('router.patch') || content.includes('router.put')) perm = "Update";
  if (content.includes('router.delete')) perm = "Delete";
  
  // Need the module name
  return `Generic.${perm}`;
}

glob.glob(srcDir + '/**/*.ts').then((files) => {
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let moduleName = path.basename(path.dirname(file));
    if (moduleName === 'auth') moduleName = 'Auth';
    if (moduleName === 'clients') moduleName = 'Client';
    if (moduleName === 'companies') moduleName = 'Company';
    if (moduleName === 'documents') moduleName = 'Document';
    if (moduleName === 'payments') moduleName = 'Payment';
    if (moduleName === 'plans') moduleName = 'Plan';
    if (moduleName === 'policies') moduleName = 'Policy';
    if (moduleName === 'premium-rates') moduleName = 'PremiumRate';
    if (moduleName === 'quotations') moduleName = 'Quotation';
    
    // Replace authorize([ ... ]) with authorize('Module.Action')
    const lines = content.split('\n');
    let changed = false;
    for (let i = 0; i < lines.length; i++) {
       if (lines[i].includes('authorize([')) {
          let perm = "Read";
          if (lines[i].includes('.post')) perm = "Create";
          if (lines[i].includes('.patch')) perm = "Update";
          if (lines[i].includes('.delete')) perm = "Delete";
          if (lines[i].includes('.get')) perm = "Read";
          
          lines[i] = lines[i].replace(/authorize\(\[.*?\]\)/g, `authorize("${moduleName}.${perm}")`);
          changed = true;
       }
    }
    
    if (changed) {
       fs.writeFileSync(file, lines.join('\n'));
       console.log(`Updated ${file}`);
    }
  });
}).catch(console.error);
