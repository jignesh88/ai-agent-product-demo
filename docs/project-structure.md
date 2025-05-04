# Project Structure

This document outlines the folder structure of the AWS Cloud Application with AI-powered chatbot capabilities.

## Root Directory

```
/
├── .github/                  # GitHub Actions workflows
│   └── workflows/            # CI/CD pipeline configurations
├── frontend/                 # Next.js 14+ frontend application
├── backend/                  # NestJS backend application
├── infrastructure/           # AWS CDK infrastructure as code
├── config/                   # Configuration files
├── scripts/                  # Utility scripts
├── docs/                     # Documentation
├── memory-bank/              # Project context and documentation
├── .gitignore                # Git ignore file
├── .eslintrc.js              # ESLint configuration
├── .prettierrc               # Prettier configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Root package.json for workspace
```

## Frontend Structure

```
frontend/
├── public/                   # Static assets
│   ├── images/               # Image assets
│   ├── fonts/                # Font assets
│   └── icons/                # Icon assets
├── src/                      # Source code
│   ├── app/                  # Next.js App Router
│   │   ├── (public)/         # Public-facing routes
│   │   │   ├── about/        # About page
│   │   │   ├── pricing/      # Pricing page
│   │   │   ├── contact/      # Contact page
│   │   │   └── features/     # Features page
│   │   ├── (auth)/           # Authentication routes
│   │   │   ├── login/        # Login page
│   │   │   ├── register/     # Registration page
│   │   │   ├── forgot-password/ # Password recovery
│   │   │   └── reset-password/  # Password reset
│   │   ├── dashboard/        # Dashboard routes
│   │   │   ├── analytics/    # Analytics page
│   │   │   ├── usage/        # Usage statistics
│   │   │   └── settings/     # Dashboard settings
│   │   ├── workflow/         # Workflow routes
│   │   │   ├── create/       # Create workflow
│   │   │   ├── edit/         # Edit workflow
│   │   │   ├── templates/    # Workflow templates
│   │   │   └── list/         # List workflows
│   │   ├── memory-bank/      # Memory bank routes
│   │   │   ├── upload/       # Document upload
│   │   │   ├── documents/    # Document management
│   │   │   └── search/       # Document search
│   │   ├── profile/          # Profile routes
│   │   │   ├── account/      # Account settings
│   │   │   ├── billing/      # Billing information
│   │   │   ├── security/     # Security settings
│   │   │   └── team/         # Team management
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # Auth API routes
│   │   │   ├── users/        # User API routes
│   │   │   ├── documents/    # Document API routes
│   │   │   ├── chat/         # Chat API routes
│   │   │   ├── workflow/     # Workflow API routes
│   │   │   └── payments/     # Payment API routes
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   ├── ui/               # UI components
│   │   │   ├── button/       # Button components
│   │   │   ├── input/        # Input components
│   │   │   ├── card/         # Card components
│   │   │   ├── modal/        # Modal components
│   │   │   ├── dropdown/     # Dropdown components
│   │   │   ├── toast/        # Toast notifications
│   │   │   ├── table/        # Table components
│   │   │   ├── pagination/   # Pagination components
│   │   │   └── tabs/         # Tab components
│   │   ├── layout/           # Layout components
│   │   │   ├── header/       # Header components
│   │   │   ├── footer/       # Footer components
│   │   │   ├── sidebar/      # Sidebar components
│   │   │   ├── navigation/   # Navigation components
│   │   │   ├── container/    # Container components
│   │   │   └── grid/         # Grid components
│   │   ├── forms/            # Form components
│   │   │   ├── auth/         # Authentication forms
│   │   │   ├── profile/      # Profile forms
│   │   │   ├── payment/      # Payment forms
│   │   │   ├── document-upload/ # Document upload forms
│   │   │   └── workflow/     # Workflow forms
│   │   ├── auth/             # Auth-related components
│   │   ├── dashboard/        # Dashboard components
│   │   │   ├── stats/        # Statistics components
│   │   │   ├── chart/        # Chart components
│   │   │   └── usage-metrics/ # Usage metrics components
│   │   ├── workflow/         # Workflow components
│   │   │   ├── diagram/      # Workflow diagram components
│   │   │   ├── node/         # Workflow node components
│   │   │   ├── edge/         # Workflow edge components
│   │   │   └── controls/     # Workflow control components
│   │   └── memory-bank/      # Memory bank components
│   │       ├── uploader/     # Document uploader components
│   │       ├── document-card/ # Document card components
│   │       └── search-results/ # Search results components
│   ├── hooks/                # Custom React hooks
│   │   ├── auth/             # Authentication hooks
│   │   ├── api/              # API hooks
│   │   ├── form/             # Form hooks
│   │   └── ui/               # UI hooks
│   ├── lib/                  # Library code
│   ├── styles/               # CSS styles
│   ├── types/                # TypeScript type definitions
│   │   ├── api/              # API types
│   │   ├── auth/             # Auth types
│   │   ├── user/             # User types
│   │   ├── document/         # Document types
│   │   ├── workflow/         # Workflow types
│   │   └── payment/          # Payment types
│   └── utils/                # Utility functions
│       ├── formatting/       # Formatting utilities
│       ├── validation/       # Validation utilities
│       ├── storage/          # Storage utilities
│       └── api/              # API utilities
├── .eslintrc.js              # ESLint configuration
├── .prettierrc               # Prettier configuration
├── tsconfig.json             # TypeScript configuration
├── next.config.js            # Next.js configuration
├── .env.local                # Local environment variables
├── .env.development          # Development environment variables
├── .env.production           # Production environment variables
└── package.json              # Package configuration
```

## Backend Structure

```
backend/
├── src/                      # Source code
│   ├── auth/                 # Authentication module
│   │   ├── controllers/      # Auth controllers
│   │   ├── services/         # Auth services
│   │   ├── dto/              # Data transfer objects
│   │   └── guards/           # Auth guards
│   ├── users/                # Users module
│   │   ├── controllers/      # User controllers
│   │   ├── services/         # User services
│   │   ├── dto/              # Data transfer objects
│   │   └── entities/         # User entities
│   ├── documents/            # Documents module
│   │   ├── controllers/      # Document controllers
│   │   ├── services/         # Document services
│   │   ├── dto/              # Data transfer objects
│   │   ├── entities/         # Document entities
│   │   └── processors/       # Document processors
│   │       ├── textract/     # AWS Textract integration
│   │       ├── parsers/      # Document parsers
│   │       └── extractors/   # Content extractors
│   ├── chat/                 # Chat module
│   │   ├── controllers/      # Chat controllers
│   │   ├── services/         # Chat services
│   │   ├── dto/              # Data transfer objects
│   │   ├── entities/         # Chat entities
│   │   └── ai/               # AI integration
│   │       ├── bedrock/      # AWS Bedrock integration
│   │       ├── embeddings/   # Vector embeddings
│   │       ├── prompts/      # LLM prompts
│   │       └── models/       # AI models
│   ├── voice/                # Voice module
│   │   ├── controllers/      # Voice controllers
│   │   ├── services/         # Voice services
│   │   ├── dto/              # Data transfer objects
│   │   └── twilio/           # Twilio integration
│   ├── payments/             # Payments module
│   │   ├── controllers/      # Payment controllers
│   │   ├── services/         # Payment services
│   │   ├── dto/              # Data transfer objects
│   │   └── stripe/           # Stripe integration
│   ├── common/               # Common code
│   │   ├── middleware/       # Middleware
│   │   ├── filters/          # Exception filters
│   │   ├── interceptors/     # Interceptors
│   │   ├── decorators/       # Custom decorators
│   │   ├── utils/            # Utility functions
│   │   └── database/         # Database
│   │       ├── models/       # Database models
│   │       ├── migrations/   # Database migrations
│   │       └── seeds/        # Database seeds
│   ├── main.ts               # Application entry point
│   ├── app.module.ts         # Root module
│   ├── app.controller.ts     # Root controller
│   └── app.service.ts        # Root service
├── test/                     # Tests
├── .eslintrc.js              # ESLint configuration
├── .prettierrc               # Prettier configuration
├── tsconfig.json             # TypeScript configuration
├── nest-cli.json             # NestJS CLI configuration
├── .env                      # Environment variables
├── .env.development          # Development environment variables
├── .env.production           # Production environment variables
└── package.json              # Package configuration
```

## Infrastructure Structure

```
infrastructure/
├── bin/                      # CDK app entry point
│   └── app.ts                # Main CDK application
├── lib/                      # CDK stacks
│   ├── frontend-stack/       # Frontend infrastructure
│   ├── backend-stack/        # Backend infrastructure
│   ├── auth-stack/           # Authentication infrastructure
│   ├── database-stack/       # Database infrastructure
│   ├── ai-stack/             # AI infrastructure
│   └── monitoring-stack/     # Monitoring infrastructure
├── cdk.out/                  # CDK output
├── cdk.json                  # CDK configuration
└── package.json              # Package configuration
```

## Configuration Structure

```
config/
├── env/                      # Environment configurations
├── aws/                      # AWS configurations
├── stripe/                   # Stripe configurations
├── twilio/                   # Twilio configurations
└── cognito/                  # Cognito configurations
```

## Scripts Structure

```
scripts/
├── deploy/                   # Deployment scripts
├── build/                    # Build scripts
├── test/                     # Test scripts
├── seed/                     # Database seed scripts
└── migrate/                  # Database migration scripts
```

## Documentation Structure

```
docs/
├── api/                      # API documentation
├── architecture/             # Architecture documentation
├── guides/                   # User guides
├── diagrams/                 # Architecture diagrams
└── project-structure.md      # Project structure documentation
