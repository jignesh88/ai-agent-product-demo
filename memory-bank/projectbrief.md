# AWS Cloud Application Project Brief

## Overview
Building a full-stack cloud application with the following components:
- Next.js 14+ frontend hosted on AWS S3 with CloudFront CDN and Route53 for DNS
- TypeScript/NestJS backend using Lambda and API Gateway
- Authentication via AWS Cognito with social identity providers
- Role-based access control system
- Tiered membership model with Stripe payment processing (AUD currency)
- AI-powered chatbot using AWS Bedrock with document processing
- Twilio integration for voice agent functionality
- Cloud-native logging and monitoring

## Core Requirements
1. Frontend must be responsive and built with latest Next.js
2. Backend must use TypeScript and NestJS deployed as serverless functions
3. Users must be able to login with social providers (Google, GitHub, Apple)
4. Role-based access control must be implemented for administrators
5. Membership tiers must include Basic (free), Advanced ($20 AUD/month), and Pro ($50 AUD/month)
6. Document processing must support DOCX and PDF formats
7. The system must use AWS Bedrock and vector databases for AI chatbot functionality
8. Twilio integration must allow chatbot to function as telephone agent
9. All components must implement proper logging and monitoring

## Project Goals
- Create a scalable, secure cloud-native application
- Enable businesses to deploy AI-powered chatbots for customer service
- Provide robust document processing and knowledge extraction capabilities
- Support multiple channels of customer interaction (web, text, voice)
- Implement a sustainable business model with tiered pricing
- Ensure high availability and performance through AWS infrastructure