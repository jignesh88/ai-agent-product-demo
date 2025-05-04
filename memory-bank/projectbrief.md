# AWS Cloud Application Project Brief

## Overview
Building a full-stack cloud application with the following components:
- Next.js 14+ frontend hosted on AWS S3 with CloudFront CDN and Route53 for DNS
- TypeScript/NestJS backend using Lambda and API Gateway
- Use CDK to create infrastructure as code
- Authentication via AWS Cognito with social identity providers
- Role-based access control system
- Tiered membership model with Stripe payment processing (AUD currency)
- Use ReactFlow to create a custom workflow
- AI-powered chatbot using AWS Bedrock with document processing
- Twilio integration for voice agent functionality
- Cloud-native logging and monitoring

## Core Requirements
1. Frontend must be responsive and built with latest Next.js
2. Backend must use TypeScript and NestJS deployed as serverless functions
3. Users must be able to login with social providers (Google, GitHub, Apple)
4. Role-based access control must be implemented for administrators
5. Membership tiers must include Basic (free), Advanced ($20 AUD/month), and Pro ($50 AUD/month)
6. Frontend application have two section one is public facing website which allow information of the company and product second is members only section where the once the user login they can acces members only section.
7. For paid version create a following submenu item for the user
   7.1 Profile - where user can manage their email, profile and settings.
   7.2 Workflow - Where use can access their pre-created workflow or add new workflow
   7.3 Memory bank - User upload the documents and the documents get stored in backend vector database
   7.4 Dashboard - User can see the chat stats and daily usage and popular chats about their products 
8. Document processing must support DOCX and PDF formats
9.  The system must use AWS Bedrock and vector databases for AI chatbot functionality
10. Twilio integration must allow chatbot to function as telephone agent
11. All components must implement proper logging and monitoring

## Project Goals
- Create a scalable, secure cloud-native application
- Enable businesses to deploy AI-powered chatbots for customer service
- Provide robust document processing and knowledge extraction capabilities
- Support multiple channels of customer interaction (web, text, voice)
- Implement a sustainable business model with tiered pricing
- Ensure high availability and performance through AWS infrastructure