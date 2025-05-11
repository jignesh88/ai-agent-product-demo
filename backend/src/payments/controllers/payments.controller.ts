import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  Delete,
  RawBodyRequest,
  Headers,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { PaymentsService } from '../services/payments.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { SubscriptionTier } from '../../users/entities/user.entity';
import Stripe from 'stripe';

interface CustomRequest extends Request {
  user: { id: string };
}

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-customer')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a Stripe customer for the current user' })
  @ApiResponse({ status: 201, description: 'Customer created successfully' })
  async createCustomer(@Req() req: CustomRequest): Promise<{ customerId: string }> {
    const userId = req.user.id;
    return this.paymentsService.createCustomer(userId);
  }

  @Get('customer')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get customer details for the current user' })
  @ApiResponse({ status: 200, description: 'Customer details retrieved successfully' })
  @ApiResponse({ status: 400, description: 'User does not have a Stripe customer account' })
  async getCustomerDetails(@Req() req: CustomRequest): Promise<Stripe.Customer> {
    const userId = req.user.id;
    return this.paymentsService.getCustomerDetails(userId);
  }

  @Post('subscribe')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Subscribe the current user to a plan' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        tier: {
          type: 'string',
          enum: Object.values(SubscriptionTier),
          example: SubscriptionTier.PRO,
        },
      },
      required: ['tier'],
    },
  })
  @ApiResponse({ status: 201, description: 'Subscription created successfully' })
  async subscribe(
    @Body('tier') tier: SubscriptionTier,
    @Req() req: CustomRequest,
  ): Promise<{ subscriptionId: string; clientSecret: string }> {
    const userId = req.user.id;
    return this.paymentsService.subscribeUser(userId, tier);
  }

  @Delete('cancel-subscription')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Cancel the current user\'s subscription' })
  @ApiResponse({ status: 204, description: 'Subscription canceled successfully' })
  @ApiResponse({ status: 400, description: 'User does not have an active subscription' })
  async cancelSubscription(@Req() req: CustomRequest): Promise<void> {
    const userId = req.user.id;
    return this.paymentsService.cancelSubscription(userId);
  }

  @Post('update-subscription')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update the current user\'s subscription' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        tier: {
          type: 'string',
          enum: Object.values(SubscriptionTier),
          example: SubscriptionTier.PRO,
        },
      },
      required: ['tier'],
    },
  })
  @ApiResponse({ status: 200, description: 'Subscription updated successfully' })
  @ApiResponse({ status: 400, description: 'User does not have a Stripe customer account' })
  async updateSubscription(
    @Body('tier') tier: SubscriptionTier,
    @Req() req: CustomRequest,
  ): Promise<{ subscriptionId: string }> {
    const userId = req.user.id;
    return this.paymentsService.updateSubscription(userId, tier);
  }

  @Get('subscription')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get subscription details for the current user' })
  @ApiResponse({ status: 200, description: 'Subscription details retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User does not have an active subscription' })
  async getSubscription(@Req() req: CustomRequest): Promise<Stripe.Subscription> {
    const userId = req.user.id;
    return this.paymentsService.getSubscription(userId);
  }

  @Post('create-checkout-session')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a Stripe Checkout session for the current user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        tier: {
          type: 'string',
          enum: Object.values(SubscriptionTier),
          example: SubscriptionTier.PRO,
        },
      },
      required: ['tier'],
    },
  })
  @ApiResponse({ status: 201, description: 'Checkout session created successfully' })
  async createCheckoutSession(
    @Body('tier') tier: SubscriptionTier,
    @Req() req: CustomRequest,
  ): Promise<{ sessionId: string; sessionUrl: string }> {
    const userId = req.user.id;
    return this.paymentsService.createCheckoutSession(userId, tier);
  }

  @Post('create-setup-intent')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a Stripe Setup Intent for the current user' })
  @ApiResponse({ status: 201, description: 'Setup intent created successfully' })
  async createSetupIntent(@Req() req: CustomRequest): Promise<{ clientSecret: string }> {
    const userId = req.user.id;
    return this.paymentsService.createSetupIntent(userId);
  }

  @Post('webhook')
  @ApiOperation({ summary: 'Handle Stripe webhook events' })
  @ApiResponse({ status: 200, description: 'Webhook handled successfully' })
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ): Promise<{ received: boolean }> {
    const payload = req.rawBody;
    return this.paymentsService.handleStripeWebhook(payload, signature);
  }
}