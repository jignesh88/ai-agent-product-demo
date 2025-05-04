# AWS Cloud Application Memory Bank

This file contains the complete memory bank for the AWS cloud application project, following the Cline Memory Bank methodology for structured documentation.

## Project Brief

### Overview
Building a full-stack cloud application with the following components:
- Next.js 14+ frontend hosted on AWS S3 with CloudFront CDN and Route53 for DNS
- TypeScript/NestJS backend using Lambda and API Gateway
- Authentication via AWS Cognito with social identity providers
- Role-based access control system
- Tiered membership model with Stripe payment processing (AUD currency)
- AI-powered chatbot using AWS Bedrock with document processing
- Twilio integration for voice agent functionality
- Cloud-native logging and monitoring

### Core Requirements
1. Frontend must be responsive and built with latest Next.js
2. Backend must use TypeScript and NestJS deployed as serverless functions
3. Users must be able to login with social providers (Google, GitHub, Apple)
4. Role-based access control must be implemented for administrators
5. Membership tiers must include Basic (free), Advanced ($20 AUD/month), and Pro ($50 AUD/month)
6. Document processing must support DOCX and PDF formats
7. The system must use AWS Bedrock and vector databases for AI chatbot functionality
8. Twilio integration must allow chatbot to function as telephone agent
9. All components must implement proper logging and monitoring

### Project Goals
- Create a scalable, secure cloud-native application
- Enable businesses to deploy AI-powered chatbots for customer service
- Provide robust document processing and knowledge extraction capabilities
- Support multiple channels of customer interaction (web, text, voice)
- Implement a sustainable business model with tiered pricing
- Ensure high availability and performance through AWS infrastructure

## Product Context

### Problem Statement
Businesses need efficient ways to handle customer support inquiries without scaling human support teams. Existing solutions often lack:
- Integration with multiple channels (web, phone)
- Easy document processing for knowledge extraction
- Flexible pricing tiers for different business sizes
- Self-service capabilities for business users

### Target Users
- Small to medium-sized e-commerce businesses
- SaaS companies with documentation-heavy products
- Organizations with frequent customer support inquiries
- Businesses looking to automate routine customer interactions

### Product Functionality
- Document Upload: Business users upload FAQs, manuals, and knowledge base docs
- Knowledge Extraction: System processes documents to build AI knowledge base
- Chat Interface: Embeddable web component for customer websites
- Voice Channel: Phone number integration via Twilio for voice support
- Admin Dashboard: Monitoring, analytics, and chatbot configuration
- Role Management: Add team members with different permission levels
- Subscription Management: Handle billing and feature access based on plan

### Success Criteria
- Reduction in customer support response time
- Accurate answers derived from uploaded documentation
- Seamless multi-channel experience (chat and voice)
- Clear analytics on usage and performance
- Easy administration for non-technical users

## System Patterns

### Architecture Pattern
- Serverless First Architecture: Using Lambda, S3, and managed services
- Microservices Pattern: Separate services for auth, document processing, chat, voice
- Event-Driven Architecture: Using SNS/SQS for asynchronous processing
- CQRS for chatbot: Separate query and command responsibilities

### Data Patterns
- Document Store: Amazon S3 for raw document storage
- Vector Database: For semantic search capabilities
- DynamoDB: For user data, permissions, and configurations
- Cache Layers: For frequently accessed data

### Frontend Patterns
- Server Components: Leveraging Next.js 14+ server components
- Client-Side State Management: React Context + SWR for data fetching
- Component-Based Design: Reusable UI components with clear responsibilities
- Progressive Enhancement: Core functionality works without JavaScript

### Security Patterns
- Zero Trust Architecture: Verify everything, trust nothing
- Principle of Least Privilege: IAM roles with minimal permissions
- Defense in Depth: Multiple security layers (WAF, CORS, input validation)
- OWASP Top 10 Mitigation: Addressing common web vulnerabilities

### Integration Patterns
- API Gateway Pattern: Centralized API management
- Webhook Pattern: For Stripe and Twilio integrations
- Circuit Breaker: For resilient external service calls
- Adapter Pattern: For consistent interfaces across services

### Deployment Patterns
- Infrastructure as Code: Using AWS CDK or CloudFormation
- CI/CD Pipeline: Automated testing and deployment
- Feature Toggles: For controlled feature rollout
- Blue/Green Deployments: For zero-downtime updates

## Technical Context

### Frontend Technologies
- Next.js 14+ with TypeScript
- React Server Components for performance
- TailwindCSS for styling
- SWR for data fetching
- Jest and React Testing Library for testing

### Backend Technologies
- NestJS framework with TypeScript
- AWS Lambda for serverless functions
- API Gateway for RESTful API endpoints
- S3 for document storage
- DynamoDB for structured data storage
- OpenSearch (or similar) for vector search

### Authentication & Authorization
- AWS Cognito User Pools
- OAuth 2.0 / OIDC for social logins
- JWT for secure token management
- Custom authorization middleware for role-based access

### AI and NLP
- AWS Bedrock for language models
- Custom vector embeddings for semantic search
- Document processing pipeline using AWS Textract
- Optimized prompting strategies for chatbot responses

### Payment Processing
- Stripe API with webhook integration
- Subscription management with Stripe Billing
- AUD currency handling with appropriate tax configuration
- Secure payment forms with Stripe Elements

### Communication
- Twilio API for voice integration
- WebSockets for real-time chat functionality
- SNS/SQS for asynchronous processing
- Email notifications via SES

### DevOps & Monitoring
- CloudWatch for logging and metrics
- X-Ray for distributed tracing
- AWS CDK for infrastructure as code
- GitHub Actions for CI/CD pipelines

### Development Environment
- TypeScript for type safety
- ESLint and Prettier for code quality
- Husky for git hooks
- Docker for local development consistency

## Active Context

### Current Focus
- Setting up the initial project structure for both frontend and backend
- Establishing the AWS infrastructure foundation using CDK or CloudFormation
- Implementing the core authentication flows with Cognito
- Designing database schemas for user data and permissions

### Recent Decisions
- Chosen Next.js App Router for frontend routing capabilities
- Selected NestJS for backend due to its TypeScript-first approach and modular design
- Decided to use DynamoDB single-table design for efficient queries
- Opted for AWS Bedrock over alternatives due to integration simplicity

### Active Considerations
- Evaluating vector database options (OpenSearch vs. other alternatives)
- Considering the optimal document chunking strategy for AI processing
- Researching best practices for Twilio integration with AWS Lambda
- Exploring Stripe webhook handling for subscription management

### Current Challenges
- Ensuring proper error handling across the serverless architecture
- Optimizing cold start times for Lambda functions
- Designing an efficient document processing pipeline
- Managing subscription state across multiple services

### Learning Focus
- AWS CDK best practices for infrastructure as code
- Optimal vector embedding strategies for document retrieval
- Stripe subscription management workflows
- Twilio programmable voice API integration patterns

## Project Progress

### Completed
- Initial project planning and architecture design
- Technology selection for major components
- AWS account setup and IAM configuration
- Initial repository structure and CI/CD pipeline setup

### In Progress
- Setting up AWS CDK for infrastructure deployment
- Implementing Cognito user pool with social providers
- Creating S3 buckets and CloudFront distribution
- Designing database schemas and access patterns

### Upcoming
- Implement document upload and processing pipeline
- Integrate AWS Bedrock for chatbot functionality
- Set up Stripe subscription management
- Develop Twilio voice integration
- Create administrative dashboard for user management

### Known Issues
- Need to optimize Lambda cold start times for production
- Require proper strategy for vector database scaling
- Must ensure Stripe webhook reliability for subscription events
- Need to define comprehensive testing strategy for AI components

### Technical Debt
- None yet (greenfield project)

### Milestones
- [  ] Initial AWS infrastructure deployment
- [  ] Authentication system with social logins
- [  ] Document upload and processing functionality
- [  ] Basic chatbot implementation with AWS Bedrock
- [  ] Stripe subscription management
- [  ] Twilio voice integration
- [  ] Administrative dashboard
- [  ] Production deployment with monitoring

## Project Rules and Patterns

### AWS Best Practices
- Follow AWS Well-Architected Framework principles
- Implement least privilege IAM roles
- Use infrastructure as code for all resources
- Implement proper tagging for resource management

### Development Workflows
- Use feature branches with pull requests
- Require code review before merging
- Run comprehensive tests in CI pipeline
- Use semantic versioning for releases

### Architecture Decisions
- Prefer serverless components where possible
- Use event-driven architecture for asynchronous processes
- Implement proper error handling and retry mechanisms
- Design for horizontal scaling from the beginning

### Code Standards
- Follow TypeScript strict mode
- Use ESLint for code quality enforcement
- Implement comprehensive unit and integration tests
- Document all public APIs and key functions

### Security Requirements
- Store no sensitive data in code repositories
- Use Secrets Manager for credentials
- Implement proper input validation on all endpoints
- Configure WAF for API Gateway protection

### Performance Considerations
- Optimize Lambda function packages for size
- Implement appropriate caching strategies
- Monitor and optimize database access patterns
- Use CloudFront for static asset delivery