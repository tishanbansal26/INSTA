# InsureFlow ERP v1.0

InsureFlow is a comprehensive Enterprise Resource Planning (ERP) platform designed specifically for the Insurance Sector. It manages the complete lifecycle of clients, quotations, policy issuance, payments, and renewals, all behind a secure and performant modern tech stack.

## Tech Stack

### Frontend
- **React 19** with **TypeScript**
- **Vite** Build Tool
- **Tailwind CSS** & **shadcn/ui** for UI Components
- **Zustand** for State Management
- **React Router** with Lazy Loaded Route Splitting
- **Vitest** & **React Testing Library** for Component Tests
- **Playwright** for End-to-End Tests

### Backend
- **Node.js** & **Express**
- **Prisma ORM** connecting to **PostgreSQL**
- **Redis** & **BullMQ** for queuing and rate limiting
- **Helmet**, **CORS**, and **express-rate-limit** for Security
- **Winston** for Structured JSON Logging
- **Vitest** & **Supertest** for API Testing

## Deployment & Execution

We provide a complete Dockerized environment for production.

### Requirements
- Docker
- Docker Compose

### Running in Production

1. Clone the repository.
2. Ensure you have Docker installed and running.
3. Boot the complete system (Nginx Frontend, Node API, Postgres DB, Redis Cache):
   \`\`\`bash
   docker-compose up -d --build
   \`\`\`
4. Apply the database schema and seed the initial master data:
   \`\`\`bash
   docker-compose exec backend npx prisma db push
   docker-compose exec backend npm run seed
   \`\`\`
5. The application will be live at `http://localhost`.

### Running Locally (Development)

1. Start the infrastructure (DB & Redis):
   \`\`\`bash
   docker-compose up -d postgres redis
   \`\`\`
2. In the `server` directory:
   \`\`\`bash
   npm install
   npx prisma db push
   npm run seed
   npm run dev
   \`\`\`
3. In the `client` directory:
   \`\`\`bash
   npm install
   npm run dev
   \`\`\`
4. Open `http://localhost:5173`.

## Testing

**Backend Tests**
\`\`\`bash
cd server
npm test
\`\`\`

**Frontend Tests**
\`\`\`bash
cd client
npm test
\`\`\`

**End-to-End Tests**
\`\`\`bash
cd client
npx playwright test
\`\`\`
