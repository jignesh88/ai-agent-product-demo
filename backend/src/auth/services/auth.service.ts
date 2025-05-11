import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    // This would typically verify the user's credentials
    // For now, just return a mock user
    return {
      id: '1',
      username,
      email: `${username}@example.com`,
      roles: ['user'],
    };
  }

  async login(loginDto: any) {
    // In a real application, you would validate credentials
    // against your database or auth provider
    const user = await this.validateUser(
      loginDto.username || loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      sub: user.id, 
      username: user.username,
      email: user.email,
      roles: user.roles
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.generateRefreshToken(user.id),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles,
      },
    };
  }

  async signup(signupDto: any) {
    // In a real application, you would create the user in your database
    // and handle duplicates, validation, etc.
    const newUser = {
      id: Math.floor(Math.random() * 1000).toString(),
      username: signupDto.username,
      email: signupDto.email,
      roles: ['user'],
    };

    const payload = { 
      sub: newUser.id, 
      username: newUser.username,
      email: newUser.email,
      roles: newUser.roles
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.generateRefreshToken(newUser.id),
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        roles: newUser.roles,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      // Verify the refresh token
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });

      // Generate new tokens
      const user = await this.usersService.findById(decoded.sub);
      
      const payload = { 
        sub: user.id, 
        username: user.username,
        email: user.email,
        roles: user.roles
      };

      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: this.generateRefreshToken(user.id),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private generateRefreshToken(userId: string): string {
    const payload = { sub: userId };
    
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRATION', '7d'),
    });
  }

  async forgotPassword(email: string) {
    // In a real application, you would:
    // 1. Verify the email exists
    // 2. Generate a password reset token
    // 3. Send an email with the reset link
    
    return { message: `Password reset link sent to ${email}` };
  }

  async resetPassword(token: string, newPassword: string) {
    // In a real application, you would:
    // 1. Verify the token is valid and not expired
    // 2. Update the user's password
    // 3. Invalidate the token
    
    if (!token || !newPassword) {
      throw new BadRequestException('Token and new password are required');
    }
    
    return { message: 'Password reset successful' };
  }
}