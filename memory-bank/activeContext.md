# Active Context

## Current Focus
- Setting up the initial project structure for both frontend and backend
- Establishing the AWS infrastructure foundation using CDK or CloudFormation
- Implementing the core authentication flows with Cognito
- Designing database schemas for user data and permissions

## Recent Decisions
- Chosen Next.js App Router for frontend routing capabilities
- Selected NestJS for backend due to its TypeScript-first approach and modular design
- Decided to use DynamoDB single-table design for efficient queries
- Opted for AWS Bedrock over alternatives due to integration simplicity

## Active Considerations
- Evaluating vector database options (OpenSearch vs. other alternatives)
- Considering the optimal document chunking strategy for AI processing
- Researching best practices for Twilio integration with AWS Lambda
- Exploring Stripe webhook handling for subscription management

## Current Challenges
- Ensuring proper error handling across the serverless architecture
- Optimizing cold start times for Lambda functions
- Designing an efficient document processing pipeline
- Managing subscription state across multiple services

## Learning Focus
- AWS CDK best practices for infrastructure as code
- Optimal vector embedding strategies for document retrieval
- Stripe subscription management workflows
- Twilio programmable voice API integration patterns