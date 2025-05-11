import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';
import { UsersService } from '../../users/services/users.service';
import { User, SubscriptionTier } from '../../users/entities/user.entity';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private readonly frontendUrl: string;

  constructor(
    private stripeService: StripeService,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    this.frontendUrl = this.configService.get<string>('FRONTEND_URL', 'http://localhost:3000');
  }

  async createCustomer(userId: string): Promise<{ customerId: string }> {
    try {
      const user = await this.usersService.findById(userId);
      
      if (user.stripeCustomerId) {
        return { customerId: user.stripeCustomerId };
      }
      
      const customer = await this.stripeService.createCustomer(
        user.email,
        user.fullName,
        { userId },
      );
      
      await this.usersService.updateStripeDetails(userId, customer.id);
      
      return { customerId: customer.id };
    } catch (error) {
      this.logger.error(`Error creating customer: ${error.message}`);
      throw error;
    }
  }

  async getCustomerDetails(userId: string): Promise<Stripe.Customer> {
    try {
      const user = await this.usersService.findById(userId);
      
      if (!user.stripeCustomerId) {
        throw new BadRequestException('User does not have a Stripe customer account');
      }
      
      return this.stripeService.getCustomer(user.stripeCustomerId);
    } catch (error) {
      this.logger.error(`Error getting customer details: ${error.message}`);
      throw error;
    }
  }

  async subscribeUser(
    userId: string,
    tier: SubscriptionTier,
  ): Promise<{ subscriptionId: string; clientSecret: string }> {
    try {
      const user = await this.usersService.findById(userId);
      
      if (!user.stripeCustomerId) {
        const { customerId } = await this.createCustomer(userId);
        user.stripeCustomerId = customerId;
      }
      
      // Get price ID from tier
      const priceId = this.stripeService.getPriceIdForTier(tier);
      
      const subscription = await this.stripeService.createSubscription(
        user.stripeCustomerId,
        priceId,
      );
      
      // Store subscription ID in user record
      await this.usersService.updateStripeDetails(
        userId,
        user.stripeCustomerId,
        subscription.id,
      );
      
      // Update user subscription tier
      await this.usersService.updateSubscription(userId, tier);
      
      const clientSecret = (subscription as any).latest_invoice?.payment_intent?.client_secret;
      
      return {
        subscriptionId: subscription.id,
        clientSecret,
      };
    } catch (error) {
      this.logger.error(`Error subscribing user: ${error.message}`);
      throw error;
    }
  }

  async cancelSubscription(userId: string): Promise<void> {
    try {
      const user = await this.usersService.findById(userId);
      
      if (!user.stripeSubscriptionId) {
        throw new BadRequestException('User does not have an active subscription');
      }
      
      await this.stripeService.cancelSubscription(user.stripeSubscriptionId);
      
      // Reset subscription tier to BASIC
      await this.usersService.updateSubscription(userId, SubscriptionTier.BASIC);
      
      // Clear subscription ID from user record
      await this.usersService.updateStripeDetails(userId, user.stripeCustomerId, null);
    } catch (error) {
      this.logger.error(`Error canceling subscription: ${error.message}`);
      throw error;
    }
  }

  async updateSubscription(
    userId: string,
    tier: SubscriptionTier,
  ): Promise<{ subscriptionId: string }> {
    try {
      const user = await this.usersService.findById(userId);
      
      if (!user.stripeCustomerId) {
        throw new BadRequestException('User does not have a Stripe customer account');
      }
      
      if (!user.stripeSubscriptionId) {
        // If user doesn't have a subscription yet, create one
        const result = await this.subscribeUser(userId, tier);
        return { subscriptionId: result.subscriptionId };
      }
      
      // Get price ID from tier
      const priceId = this.stripeService.getPriceIdForTier(tier);
      
      // Update existing subscription
      const subscription = await this.stripeService.updateSubscription(
        user.stripeSubscriptionId,
        priceId,
      );
      
      // Update user subscription tier
      await this.usersService.updateSubscription(userId, tier);
      
      return { subscriptionId: subscription.id };
    } catch (error) {
      this.logger.error(`Error updating subscription: ${error.message}`);
      throw error;
    }
  }

  async getSubscription(userId: string): Promise<Stripe.Subscription> {
    try {
      const user = await this.usersService.findById(userId);
      
      if (!user.stripeSubscriptionId) {
        throw new NotFoundException('User does not have an active subscription');
      }
      
      return this.stripeService.getSubscription(user.stripeSubscriptionId);
    } catch (error) {
      this.logger.error(`Error getting subscription: ${error.message}`);
      throw error;
    }
  }

  async createCheckoutSession(
    userId: string,
    tier: SubscriptionTier,
  ): Promise<{ sessionId: string; sessionUrl: string }> {
    try {
      const user = await this.usersService.findById(userId);
      
      if (!user.stripeCustomerId) {
        const { customerId } = await this.createCustomer(userId);
        user.stripeCustomerId = customerId;
      }
      
      // Get price ID from tier
      const priceId = this.stripeService.getPriceIdForTier(tier);
      
      // Create checkout session
      const session = await this.stripeService.createCheckoutSession(
        user.stripeCustomerId,
        priceId,
        `${this.frontendUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        `${this.frontendUrl}/checkout/canceled`,
      );
      
      return {
        sessionId: session.id,
        sessionUrl: session.url,
      };
    } catch (error) {
      this.logger.error(`Error creating checkout session: ${error.message}`);
      throw error;
    }
  }

  async createSetupIntent(userId: string): Promise<{ clientSecret: string }> {
    try {
      const user = await this.usersService.findById(userId);
      
      if (!user.stripeCustomerId) {
        const { customerId } = await this.createCustomer(userId);
        user.stripeCustomerId = customerId;
      }
      
      const setupIntent = await this.stripeService.createSetupIntent(user.stripeCustomerId);
      
      return { clientSecret: setupIntent.client_secret };
    } catch (error) {
      this.logger.error(`Error creating setup intent: ${error.message}`);
      throw error;
    }
  }

  async handleStripeWebhook(
    payload: Buffer,
    signature: string,
  ): Promise<{ received: boolean }> {
    try {
      const event = this.stripeService.constructWebhookEvent(payload, signature);
      
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session;
          
          if (session.customer && session.subscription) {
            // Find user by Stripe customer ID
            const user = await this.usersService.findByStripeCustomerId(session.customer as string);
            
            if (user) {
              // Update subscription details
              await this.usersService.updateStripeDetails(
                user.id,
                session.customer as string,
                session.subscription as string,
              );
              
              // Get subscription to determine tier
              const subscription = await this.stripeService.getSubscription(
                session.subscription as string,
              );
              
              if (subscription?.items?.data[0]?.price?.id) {
                const tier = this.stripeService.getTierFromPriceId(
                  subscription.items.data[0].price.id,
                );
                
                // Update user subscription tier
                await this.usersService.updateSubscription(user.id, tier);
              }
            }
          }
          break;
        }
        
        case 'customer.subscription.updated': {
          const subscription = event.data.object as Stripe.Subscription;
          
          if (subscription.customer) {
            // Find user by Stripe customer ID
            const user = await this.usersService.findByStripeCustomerId(
              subscription.customer as string,
            );
            
            if (user) {
              // Update user subscription status based on subscription status
              if (subscription.status === 'active' && subscription?.items?.data[0]?.price?.id) {
                const tier = this.stripeService.getTierFromPriceId(
                  subscription.items.data[0].price.id,
                );
                
                // Update user subscription tier
                await this.usersService.updateSubscription(user.id, tier);
              } else if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
                // Downgrade to basic tier if subscription is canceled or unpaid
                await this.usersService.updateSubscription(user.id, SubscriptionTier.BASIC);
              }
            }
          }
          break;
        }
        
        case 'customer.subscription.deleted': {
          const subscription = event.data.object as Stripe.Subscription;
          
          if (subscription.customer) {
            // Find user by Stripe customer ID
            const user = await this.usersService.findByStripeCustomerId(
              subscription.customer as string,
            );
            
            if (user) {
              // Downgrade to basic tier
              await this.usersService.updateSubscription(user.id, SubscriptionTier.BASIC);
              
              // Clear subscription ID from user record
              await this.usersService.updateStripeDetails(user.id, subscription.customer as string, null);
            }
          }
          break;
        }
      }
      
      return { received: true };
    } catch (error) {
      this.logger.error(`Error handling webhook: ${error.message}`);
      throw error;
    }
  }
}