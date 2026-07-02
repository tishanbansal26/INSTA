const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf-8');

// Replace cuid with uuid
schema = schema.replace(/@default\(cuid\(\)\)/g, '@default(uuid())');

// Company model updates
const companyModelSearch = `model Company {
  id           String         @id @default(uuid())
  code         String         @unique
  description  String?`;

const companyModelReplace = `model Company {
  id           String         @id @default(uuid())
  code         String         @unique
  name         String
  logo         String?
  website      String?
  email        String?
  phone        String?
  description  String?`;

schema = schema.replace(companyModelSearch, companyModelReplace);

// RefreshToken cascade delete
const refreshRelSearch = `  user      User     @relation(fields: [userId], references: [id])`;
const refreshRelReplace = `  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)`;
schema = schema.replace(refreshRelSearch, refreshRelReplace);

// Quotation index
const quotationIndexSearch = `  @@index([clientId])
  @@index([companyId])
  @@index([status])`;
const quotationIndexReplace = `  @@index([clientId])
  @@index([companyId])
  @@index([status])
  @@index([quotationNumber])`;
schema = schema.replace(quotationIndexSearch, quotationIndexReplace);

// Renewal index
const renewalIndexSearch = `  @@index([dueDate])
  @@index([renewalStatus])`;
const renewalIndexReplace = `  @@index([dueDate])
  @@index([renewalDate])
  @@index([renewalStatus])`;
schema = schema.replace(renewalIndexSearch, renewalIndexReplace);

// PremiumRate dimensions
const premiumRateSearch = `  gender     Gender?
  cityTier   String?
  familyType String?`;
const premiumRateReplace = `  gender           Gender?
  cityTier         String?
  familyType       String?
  relationshipType String?
  smokerStatus     Boolean?
  riderCombinations Json?`;
schema = schema.replace(premiumRateSearch, premiumRateReplace);

fs.writeFileSync(schemaPath, schema, 'utf-8');
console.log('Schema updated successfully!');
