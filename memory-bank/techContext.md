# Technical Context

## Frontend Technologies
- Next.js 14+ with TypeScript
- React Server Components for performance
- TailwindCSS for styling
- Use Stripe like UI for minimalist look.
- SWR for data fetching
- Jest and React Testing Library for testing

## Backend Technologies
- NestJS framework with TypeScript
- AWS Lambda for serverless functions
- API Gateway for RESTful API endpoints
- S3 for document storage
- DynamoDB for structured data storage
- OpenSearch (or similar) for vector search

## Authentication & Authorization
- AWS Cognito User Pools
- OAuth 2.0 / OIDC for social logins
- JWT for secure token management
- Custom authorization middleware for role-based access

## AI and NLP
- AWS Bedrock for language models
- Custom vector embeddings for semantic search
- Document processing pipeline using AWS Textract
- Optimized prompting strategies for chatbot responses

## Payment Processing
- Stripe API with webhook integration
- Subscription management with Stripe Billing
- AUD currency handling with appropriate tax configuration
- Secure payment forms with Stripe Elements

## Communication
- Twilio API for voice integration
- WebSockets for real-time chat functionality
- SNS/SQS for asynchronous processing
- Email notifications via SES

## DevOps & Monitoring
- CloudWatch for logging and metrics
- X-Ray for distributed tracing
- AWS CDK for infrastructure as code
- GitHub Actions for CI/CD pipelines

## Development Environment
- TypeScript for type safety
- ESLint and Prettier for code quality
- Husky for git hooks
- Docker for local development consistency