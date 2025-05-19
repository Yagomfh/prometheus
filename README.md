# 🔥 Prometheus 🔥

A modern full-stack web application built with TanStack Start, featuring a robust tech stack and developer-friendly setup.

## 🚀 Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) with React 19
- **API Layer**: [tRPC](https://trpc.io/) for type-safe API calls
- **Database**: PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [better-auth](https://better-auth.com)
- **UI**: [Chakra UI](https://chakra-ui.com/)
- **Development**: TypeScript, ESLint, Prettier

## 🛠️ Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- PostgreSQL
- pnpm (package manager)

### Installation

1. Clone the repository:
```bash
git clone git@github.com:Yagomfh/prometheus.git
cd prometheus
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up your environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
pnpm dev
```

## 📦 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm db:generate` - Generate database migrations
- `pnpm db:migrate` - Run database migrations
- `pnpm db:push` - Push database changes
- `pnpm db:seed` - Seed the database
- `pnpm db:studio` - Open Drizzle Studio
- `pnpm format` - Format code with Prettier
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm docker:up` - Start Docker containers
- `pnpm docker:down` - Stop Docker containers
- `pnpm docker:build` - Build Docker images
- `pnpm docker:dev` - Start Docker containers in development mode

## 🐳 Docker Support

The project includes Docker configuration for easy deployment:

```bash
pnpm docker:up
```

## 📝 Credits

This project was initially set up using [Kolm Start](https://github.com/jellekuipers/kolm-start.git), a powerful starter template that provides a solid foundation for modern web applications.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details. 