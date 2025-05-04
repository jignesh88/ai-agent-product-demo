# AWS Cloud Application with AI Chatbot

A production-ready AWS cloud application with AI-powered chatbot capabilities.

## Project Overview

This project demonstrates a full-stack AWS cloud application with the following key features:

- Next.js 14+ frontend hosted on S3 with CloudFront CDN
- NestJS backend using Lambda and API Gateway
- Authentication with AWS Cognito (Google, GitHub, Apple login)
- Role-based access control system
- Tiered membership model with Stripe payment processing
- AI chatbot powered by AWS Bedrock with document processing
- Twilio integration for voice agent functionality

## Project Structure

The project follows a well-organized structure:

- **frontend/**: Next.js 14+ application with TypeScript
- **backend/**: NestJS serverless application with TypeScript
- **infrastructure/**: AWS CDK infrastructure as code
- **config/**: Configuration files for various services
- **scripts/**: Utility scripts for development and deployment
- **docs/**: Project documentation
- **memory-bank/**: Project context and documentation

For a detailed breakdown of the project structure, see [Project Structure Documentation](docs/project-structure.md).

## Getting Started

### Prerequisites

- Node.js 18+
- AWS CLI configured with appropriate credentials
- AWS CDK installed globally
- Docker (for local development)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp frontend/.env.example frontend/.env.local
   cp backend/.env.example backend/.env
   ```
4. Deploy infrastructure:
   ```bash
   cd infrastructure
   npm run deploy
   ```

## Development

### Frontend

```bash
cd frontend
npm run dev
```

### Backend

```bash
cd backend
npm run start:dev
```

## Deployment

The project uses AWS CDK for infrastructure deployment:

```bash
cd infrastructure
npm run deploy
```

## Features

### Authentication

- Social login with Google, GitHub, and Apple
- Role-based access control
- Secure token management

### Document Processing

- Upload DOCX and PDF documents
- Extract content using AWS Textract
- Store in vector database for semantic search

### AI Chatbot

- Powered by AWS Bedrock
- Semantic search for relevant information
- Optimized prompting strategies

### Voice Integration

- Twilio integration for telephone agent
- Voice-to-text and text-to-voice capabilities

### Payment Processing

- Stripe integration for subscription management
- Tiered pricing model (Basic, Advanced, Pro)
- Secure payment handling

## License

MIT
