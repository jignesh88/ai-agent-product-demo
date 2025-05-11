import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { SubscriptionTier } from '../../users/entities/user.entity';

@Injectable()
export class StripeService {
  private readonly logger = new Logger(StripeService.name);
  private stripe: Stripe;
  private readonly webhookSecret: string;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('STRIPE_API_KEY');
    
    if (!apiKey) {
      this.logger.warn('Stripe API key not found. Stripe service will be limited.');
    } else {
      this.stripe = new Stripe(apiKey, {
        apiVersion: '2022-11-15',  // Use the appropriate Stripe API version
      });
    }
    
    const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret) {
      throw new Error('Stripe webhook secret not configured');
    }
    this.webhookSecret = webhookSecret;
  }

  async createCustomer(
    email: string,
    name?: string,
    metadata?: Record<string, string>,
  ): Promise<Stripe.Customer> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe client not initialized');
      }
      
      return this.stripe.customers.create({
        email,
        name,
        metadata,
      });
    } catch (error) {
      this.logger.error(`Error creating Stripe customer: ${error.message}`);
      throw error;
    }
  }

  async getCustomer(customerId: string): Promise<Stripe.Customer> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe client not initialized');
      }
      
      return this.stripe.customers.retrieve(customerId) as Promise<Stripe.Customer>;
    } catch (error) {
      this.logger.error(`Error retrieving Stripe customer: ${error.message}`);
      throw error;
    }
  }

  async createSubscription(
    customerId: string,
    priceId: string,
  ): Promise<Stripe.Subscription> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe client not initialized');
      }
      
      return this.stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: priceId,
          },
        ],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });
    } catch (error) {
      this.logger.error(`Error creating Stripe subscription: ${error.message}`);
      throw error;
    }
  }

  async cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe client not initialized');
      }
      
      return this.stripe.subscriptions.cancel(subscriptionId);
    } catch (error) {
      this.logger.error(`Error canceling Stripe subscription: ${error.message}`);
      throw error;
    }
  }

  async updateSubscription(
    subscriptionId: string,
    priceId: string,
  ): Promise<Stripe.Subscription> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe client not initialized');
      }
      
      // First, get the subscription to find the subscription item ID
      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
      
      if (!subscription.items.data.length) {
        throw new Error(`No items found for subscription ${subscriptionId}`);
      }
      
      const subscriptionItemId = subscription.items.data[0].id;
      
      // Update the subscription
      return this.stripe.subscriptions.update(subscriptionId, {
        items: [
          {
            id: subscriptionItemId,
            price: priceId,
          },
        ],
      });
    } catch (error) {
      this.logger.error(`Error updating Stripe subscription: ${error.message}`);
      throw error;
    }
  }

  async createPaymentIntent(
    amount: number,
    currency: string,
    customerId: string,
    metadata?: Record<string, string>,
  ): Promise<Stripe.PaymentIntent> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe client not initialized');
      }
      
      return this.stripe.paymentIntents.create({
        amount,
        currency,
        customer: customerId,
        metadata,
      });
    } catch (error) {
      this.logger.error(`Error creating payment intent: ${error.message}`);
      throw error;
    }
  }

  async createSetupIntent(customerId: string): Promise<Stripe.SetupIntent> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe client not initialized');
      }
      
      return this.stripe.setupIntents.create({
        customer: customerId,
      });
    } catch (error) {
      this.logger.error(`Error creating setup intent: ${error.message}`);
      throw error;
    }
  }

  async getSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe client not initialized');
      }
      
      return this.stripe.subscriptions.retrieve(subscriptionId);
    } catch (error) {
      this.logger.error(`Error retrieving subscription: ${error.message}`);
      throw error;
    }
  }

  async listSubscriptions(customerId: string): Promise<Stripe.Subscription[]> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe client not initialized');
      }
      
      const subscriptions = await this.stripe.subscriptions.list({
        customer: customerId,
        status: 'active',
      });
      
      return subscriptions.data;
    } catch (error) {
      this.logger.error(`Error listing subscriptions: ${error.message}`);
      throw error;
    }
  }

  async createCheckoutSession(
    customerId: string,
    priceId: string,
    successUrl: string,
    cancelUrl: string,
  ): Promise<Stripe.Checkout.Session> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe client not initialized');
      }
      
      return this.stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: successUrl,
        cancel_url: cancelUrl,
      });
    } catch (error) {
      this.logger.error(`Error creating checkout session: ${error.message}`);
      throw error;
    }
  }

  async getPaymentMethod(paymentMethodId: string): Promise<Stripe.PaymentMethod> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe client not initialized');
      }
      
      return this.stripe.paymentMethods.retrieve(paymentMethodId);
    } catch (error) {
      this.logger.error(`Error retrieving payment method: ${error.message}`);
      throw error;
    }
  }

  constructWebhookEvent(payload: Buffer, signature: string): Stripe.Event {
    try {
      if (!this.stripe) {
        throw new Error('Stripe client not initialized');
      }
      
      if (!this.webhookSecret) {
        throw new Error('Stripe webhook secret not configured');
      }
      
      return this.stripe.webhooks.constructEvent(
        payload,
        signature,
        this.webhookSecret,
      );
    } catch (error) {
      this.logger.error(`Error constructing webhook event: ${error.message}`);
      throw error;
    }
  }

  getPriceIdForTier(tier: SubscriptionTier): string {
    // This would map to your actual Stripe price IDs in production
    switch (tier) {
      case SubscriptionTier.BASIC:
        return this.configService.get<string>('STRIPE_BASIC_PRICE_ID', 'price_basic');
      case SubscriptionTier.ADVANCED:
        return this.configService.get<string>('STRIPE_ADVANCED_PRICE_ID', 'price_advanced');
      case SubscriptionTier.PRO:
        return this.configService.get<string>('STRIPE_PRO_PRICE_ID', 'price_pro');
      default:
        return this.configService.get<string>('STRIPE_BASIC_PRICE_ID', 'price_basic');
    }
  }

  getTierFromPriceId(priceId: string): SubscriptionTier {
    const basicPriceId = this.configService.get<string>('STRIPE_BASIC_PRICE_ID', 'price_basic');
    const advancedPriceId = this.configService.get<string>('STRIPE_ADVANCED_PRICE_ID', 'price_advanced');
    const proPriceId = this.configService.get<string>('STRIPE_PRO_PRICE_ID', 'price_pro');
    
    if (priceId === proPriceId) {
      return SubscriptionTier.PRO;
    } else if (priceId === advancedPriceId) {
      return SubscriptionTier.ADVANCED;
    } else {
      return SubscriptionTier.BASIC;
    }
  }
}