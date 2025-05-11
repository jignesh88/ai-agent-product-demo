# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This project is a full-stack AWS cloud application with AI-powered chatbot capabilities, featuring:

- Next.js 14+ frontend (React, TypeScript, TailwindCSS) hosted on S3 with CloudFront CDN
- NestJS backend (TypeScript) using Lambda and API Gateway
- Authentication with AWS Cognito (Google, GitHub, Apple login)
- Role-based access control system
- Tiered membership model with Stripe payment processing
- AI chatbot powered by AWS Bedrock with document processing
- Twilio integration for voice agent functionality
- AWS CDK for infrastructure as code

## Commands

### General Commands

```bash
# Install dependencies for all workspaces
npm install

# Run tests for all workspaces
npm run test

# Run linting for all workspaces
npm run lint

# Format all code
npm run format
```

### Frontend Commands

```bash
# Start frontend development server
cd frontend
npm run dev
# OR
npm run dev:frontend

# Build frontend for production
cd frontend
npm run build
# OR
npm run build:frontend

# Run frontend tests
cd frontend
npm run test
# OR
npm run test:frontend

# Run frontend tests in watch mode
cd frontend
npm run test:watch

# Run frontend linting
cd frontend
npm run lint
# OR
npm run lint:frontend
```

### Backend Commands

```bash
# Start backend development server
cd backend
npm run start:dev
# OR
npm run dev:backend

# Build backend for production
cd backend
npm run build
# OR
npm run build:backend

# Run backend tests
cd backend
npm run test
# OR
npm run test:backend

# Run backend tests in watch mode
cd backend
npm run test:watch

# Run backend tests with coverage
cd backend
npm run test:cov

# Run backend e2e tests
cd backend
npm run test:e2e

# Run backend linting
cd backend
npm run lint
# OR
npm run lint:backend
```

### Infrastructure Commands

```bash
# Deploy all infrastructure
cd infrastructure
npm run deploy

# Destroy all infrastructure
cd infrastructure
npm run destroy

# Synthesize CloudFormation templates
cd infrastructure
npm run synth

# Check infrastructure diff
cd infrastructure
npm run diff
```

## Architecture Overview

### Frontend Architecture

The frontend is built using Next.js 14+ with TypeScript and follows a modular structure:

- **App Router**: Uses Next.js App Router structure with route groups
- **Components**: Organized by function (UI, layout, forms, etc.)
- **Hooks**: Custom React hooks for auth, API, forms, and UI
- **State Management**: Uses SWR for data fetching and caching
- **Authentication**: AWS Amplify is used for Cognito authentication
- **Styling**: TailwindCSS with a minimalist Stripe-like UI

### Backend Architecture

The backend uses NestJS with TypeScript and follows a modular design:

- **Modules**: Separate modules for auth, users, documents, chat, voice, payments
- **Services**: Business logic contained in service classes
- **Controllers**: API endpoints defined in controllers
- **DTOs**: Data transfer objects for API request/response validation
- **Entities**: Database models representing data structures
- **Authentication**: Custom guards with JWT tokens from Cognito
- **Document Processing**: Uses Textract for document extraction and processing
- **AI Integration**: AWS Bedrock service for LLM capabilities
- **Vector Search**: Document embeddings for semantic search
- **Payment Processing**: Stripe integration for subscriptions

### Infrastructure Architecture

The infrastructure is defined using AWS CDK:

- **Stacks**: Separate stacks for frontend, backend, auth, database, AI, monitoring
- **Frontend**: S3 bucket with CloudFront distribution
- **Backend**: Lambda functions with API Gateway
- **Database**: DynamoDB tables and indices
- **Auth**: Cognito user pools and identity providers
- **AI**: Bedrock models and OpenSearch for vector search
- **Monitoring**: CloudWatch and X-Ray configuration

## Development Workflow

1. Start frontend and backend development servers
2. Make changes to frontend/backend code
3. Run tests to ensure functionality
4. Run linting to ensure code quality
5. Build and deploy using CDK

## Key Files and Directories

- **Frontend**:
  - `frontend/src/app/`: Next.js App Router pages
  - `frontend/src/components/`: React components
  - `frontend/src/hooks/`: Custom React hooks
  - `frontend/src/lib/`: Library code and utilities

- **Backend**:
  - `backend/src/`: NestJS application source
  - `backend/src/main.ts`: Application entry point
  - `backend/src/app.module.ts`: Root module
  - `backend/src/*/`: Feature modules (auth, users, documents, etc.)

- **Infrastructure**:
  - `infrastructure/bin/`: CDK application entry point
  - `infrastructure/lib/`: CDK stack definitions