#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FrontendStack } from '../lib/frontend-stack';
import { BackendStack } from '../lib/backend-stack';
import { AuthStack } from '../lib/auth-stack';
import { DatabaseStack } from '../lib/database-stack';
import { AiStack } from '../lib/ai-stack';
import { MonitoringStack } from '../lib/monitoring-stack';

const app = new cdk.App();

// Define common props
const env = { 
  account: process.env.CDK_DEFAULT_ACCOUNT, 
  region: process.env.CDK_DEFAULT_REGION || 'ap-southeast-2' // Default to Sydney region
};

// Tags for all resources
const tags = {
  Project: 'AWS-Cloud-Application',
  Environment: app.node.tryGetContext('environment') || 'dev',
  ManagedBy: 'CDK'
};

// Create stacks
const databaseStack = new DatabaseStack(app, 'DatabaseStack', { env, tags });

const authStack = new AuthStack(app, 'AuthStack', { 
  env, 
  tags,
  databaseStack
});

const backendStack = new BackendStack(app, 'BackendStack', { 
  env, 
  tags,
  databaseStack,
  authStack
});

const aiStack = new AiStack(app, 'AiStack', { 
  env, 
  tags,
  databaseStack,
  backendStack
});

const frontendStack = new FrontendStack(app, 'FrontendStack', { 
  env, 
  tags,
  backendStack,
  authStack
});

const monitoringStack = new MonitoringStack(app, 'MonitoringStack', { 
  env, 
  tags,
  frontendStack,
  backendStack,
  authStack,
  databaseStack,
  aiStack
});

// Apply tags to all stacks
for (const key in tags) {
  if (Object.prototype.hasOwnProperty.call(tags, key)) {
    const value = tags[key as keyof typeof tags];
    cdk.Tags.of(app).add(key, value);
  }
}
