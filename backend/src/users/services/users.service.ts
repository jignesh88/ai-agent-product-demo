import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole, SubscriptionTier } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(role?: UserRole): Promise<User[]> {
    if (role) {
      return this.usersRepository.find({ where: { role } });
    }
    return this.usersRepository.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User with email "${email}" not found`);
    }

    return user;
  }

  async findByCognitoId(cognitoId: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { cognitoId } });

    if (!user) {
      throw new NotFoundException(`User with Cognito ID "${cognitoId}" not found`);
    }

    return user;
  }

  async findByStripeCustomerId(stripeCustomerId: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { stripeCustomerId } });

    if (!user) {
      throw new NotFoundException(`User with Stripe Customer ID "${stripeCustomerId}" not found`);
    }

    return user;
  }

  async create(createUserDto: any): Promise<User> {
    // Check if user with this email already exists
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    
    if (existingUser) {
      throw new ConflictException(`User with email "${createUserDto.email}" already exists`);
    }
    
    // Hash password if provided
    if (createUserDto.password) {
      const salt = await bcrypt.genSalt();
      createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    }
    
    const user = this.usersRepository.create(createUserDto);
    if (Array.isArray(user)) {
      throw new Error('Expected a single User object, but received an array.');
    }
    return this.usersRepository.save(user);
  }

  async update(id: string, updateUserDto: any): Promise<User> {
    const user = await this.findById(id);
    
    // Hash password if it's being updated
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }
    
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }

  async updateLastLogin(id: string): Promise<User> {
    const user = await this.findById(id);
    user.lastLoginAt = new Date();
    return this.usersRepository.save(user);
  }

  async updateSubscription(id: string, tier: SubscriptionTier): Promise<User> {
    const user = await this.findById(id);
    user.subscriptionTier = tier;
    return this.usersRepository.save(user);
  }

  async updateStripeDetails(
    id: string,
    stripeCustomerId: string,
    stripeSubscriptionId?: string,
  ): Promise<User> {
    const user = await this.findById(id);
    user.stripeCustomerId = stripeCustomerId;
    
    if (stripeSubscriptionId) {
      user.stripeSubscriptionId = stripeSubscriptionId;
    }
    
    return this.usersRepository.save(user);
  }

  async verifyEmail(id: string): Promise<User> {
    const user = await this.findById(id);
    user.isEmailVerified = true;
    return this.usersRepository.save(user);
  }
}