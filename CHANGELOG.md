# Changelog

All notable changes to the InsureFlow ERP project will be documented in this file.

## [v1.0.0] - 2026-07-02

### Added
- **Core Architecture**: Established monorepo architecture with React 19 Client and Express/Prisma Backend.
- **Testing Suites**: Implemented Vitest/Supertest for Backend APIs, Vitest/React Testing Library for Frontend components, and Playwright for E2E tests.
- **Dockerization**: Complete container orchestration via `docker-compose.yml`, utilizing multi-stage builds for the backend (Node) and frontend (Nginx).
- **Seed Scripts**: Introduced `server/prisma/seed.ts` to automatically populate database with Companies, Plans, Premium Rates, and Clients.
- **Security Headers**: Integrated Helmet for Content Security Policies and express-rate-limit.
- **Performance**: Integrated React lazy loading (`Suspense`) in `App.tsx` for optimal chunking.
- **Master Data Sprints**: Frontend CRUD shells for Clients, Companies, and Plans.
- **Premium Calculator**: Interactive tool computing base premium and GST mappings.
- **Policies & Quotations**: Functional tracking and lifecycle lists.
- **Logging**: Integrated Winston for structured JSON log rotation and request tracing.

### Next Roadmap (v2.0 Preview)
- 10-Step Policy Issuance Wizard.
- Automated Document parsing (OCR) & Document Verification flows.
- PDF generation for Reports and Analytics exports.
