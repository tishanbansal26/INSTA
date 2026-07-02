# Database Design & Architecture

This document serves as the single source of truth for the InsureFlow Pro database schema.

## 1. Enums

- **Role**: `ADMIN`, `MANAGER`, `AGENT`, `ACCOUNTANT`
- **Gender**: `MALE`, `FEMALE`, `OTHER`
- **MaritalStatus**: `SINGLE`, `MARRIED`, `DIVORCED`, `WIDOWED`
- **PolicyStatus**: `DRAFT`, `PENDING`, `ACTIVE`, `EXPIRED`, `CANCELLED`
- **PolicyPaymentStatus**: `PENDING`, `PARTIAL`, `PAID`, `FAILED` (Used in Policy to track overall payment completion)
- **QuoteStatus**: `DRAFT`, `SENT`, `ACCEPTED`, `REJECTED`, `EXPIRED`
- **PaymentMode**: `CASH`, `UPI`, `CARD`, `NET_BANKING`, `CHEQUE`
- **PaymentStatus**: `PENDING`, `SUCCESS`, `FAILED`, `REFUNDED` (Used for individual Payment transactions)
- **DocumentType**: `IDENTITY`, `ADDRESS_PROOF`, `POLICY_DOCUMENT`, `RECEIPT`, `OTHER`
- **RenewalStatus**: `PENDING`, `RENEWED`, `EXPIRED`, `CANCELLED`

## 2. Tables & Relationships

### `User`
- **Purpose**: System users (Agents, Admins, Accountants).
- **Relationships**:
  - `1:N` -> `RefreshToken`
  - `1:N` -> `Client` (created by)
  - `1:N` -> `Policy` (managed by agent)
  - `1:N` -> `Quotation` (created by)
  - `1:N` -> `Payment` (processed by / created by)
- **Indexes**: `email`, `phone`
- **Modules**: Authentication, Dashboard, Settings, Audit logs.

### `Client`
- **Purpose**: Customer profiles and demographics.
- **Relationships**:
  - `N:1` -> `User` (createdBy)
  - `1:N` -> `Policy`
  - `1:N` -> `Quotation`
  - `1:N` -> `Document`
- **Indexes**: `phone`, `email`, `pan`
- **Modules**: Clients, Policies, Quotations, Documents.

### `Document` (New)
- **Purpose**: Store URLs/Paths to KYC documents, PDFs, and Receipts.
- **Fields**: `id`, `clientId`, `policyId` (nullable), `type`, `url`, `uploadedAt`, `createdById`
- **Relationships**:
  - `N:1` -> `Client`
  - `N:1` -> `Policy` (nullable)
  - `N:1` -> `User` (uploadedBy)
- **Indexes**: `clientId`, `policyId`, `type`
- **Modules**: Documents, Clients, Policies, Payments (for Receipts).

### `Company`
- **Purpose**: Insurance providers (e.g., HDFC Ergo, LIC).
- **Relationships**:
  - `1:N` -> `Plan`
  - `1:N` -> `Policy`
  - `1:N` -> `PremiumRate`
  - `1:N` -> `Quotation`
- **Indexes**: `code`
- **Modules**: Companies, Plans, Quotations, Policies.

### `Plan`
- **Purpose**: Specific insurance products offered by Companies.
- **Relationships**:
  - `N:1` -> `Company`
  - `1:N` -> `Policy`
  - `1:N` -> `PremiumRate`
  - `1:N` -> `Quotation`
- **Indexes**: `companyId`, `code`
- **Modules**: Plans, Premium Calculator, Policies, Quotations.

### `PremiumRate`
- **Purpose**: Lookup table for calculating premiums based on age, sum insured, and tenure.
- **Relationships**:
  - `N:1` -> `Company`
  - `N:1` -> `Plan`
- **Indexes**: `[companyId, planId]`, `[ageFrom, ageTo]`
- **Modules**: Premium Calculator, Quotations.

### `Quotation`
- **Purpose**: Pre-policy quotes generated for Clients.
- **Relationships**:
  - `N:1` -> `Client`
  - `N:1` -> `Company`
  - `N:1` -> `Plan`
  - `N:1` -> `User` (createdBy)
- **Indexes**: `clientId`, `companyId`, `status`
- **Modules**: Quotations, Premium Calculator.

### `Policy`
- **Purpose**: Active or past insurance policies.
- **Relationships**:
  - `N:1` -> `Client`
  - `N:1` -> `Company`
  - `N:1` -> `Plan`
  - `N:1` -> `User` (agent)
  - `1:N` -> `Payment`
  - `1:N` -> `Renewal`
  - `1:N` -> `Document`
- **Indexes**: `policyNumber`, `clientId`, `companyId`, `status`
- **Modules**: Policies, Dashboard, Payments, Renewals, Reports.

### `Payment` (New)
- **Purpose**: Track financial transactions against a Policy. Includes receipt generation.
- **Fields**:
  - `id` (String, uuid)
  - `receiptNumber` (String, unique) e.g., RCPT-2026-000001
  - `policyId` (String)
  - `amount` (Decimal)
  - `gst` (Decimal)
  - `paymentMode` (Enum: PaymentMode)
  - `paymentStatus` (Enum: PaymentStatus)
  - `transactionId` (String?)
  - `paidAt` (DateTime?)
  - `remarks` (String?)
  - `createdById` (String) - Audit tracking
  - `createdAt`, `updatedAt`
- **Relationships**:
  - `N:1` -> `Policy`
  - `N:1` -> `User` (createdBy)
- **Indexes**: `receiptNumber`, `policyId`, `paymentStatus`
- **Modules**: Payments, Policies, Reports, Dashboard.
- **Rules**:
  1. Cannot exceed the policy premium.
  2. A cancelled policy should not accept new payments.
  3. Mark Policy as `PAID` when the sum of `SUCCESS` payments >= `premiumAmount + gstAmount`.

### `Renewal` (New)
- **Purpose**: Track the lifecycle of policy renewals and reminders.
- **Fields**: `id`, `policyId`, `dueDate`, `status`, `newPolicyId` (nullable), `remarks`, `createdAt`, `updatedAt`
- **Relationships**:
  - `N:1` -> `Policy` (The policy being renewed)
  - `1:1` -> `Policy` (The new policy generated after renewal, nullable)
- **Indexes**: `policyId`, `dueDate`, `status`
- **Modules**: Renewals, Dashboard, Reports.
