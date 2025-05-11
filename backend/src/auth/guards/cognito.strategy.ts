import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { passportJwtSecret } from 'jwks-rsa';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class CognitoStrategy extends PassportStrategy(Strategy, 'cognito') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: (req) => {
        if (!req || !req.headers.authorization) {
          return null;
        }
        const authHeader = req.headers.authorization;
        const match = authHeader.match(/^Bearer\s+(.*)$/i);
        return match ? match[1] : null;
      },
      ignoreExpiration: false,
      // In a real application, you would fetch the JWKS from Cognito
      // Use a secret for demo purposes
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: configService.get<string>('COGNITO_JWKS_URI', 'https://example.com/.well-known/jwks.json'),
      }),
      audience: configService.get<string>('COGNITO_CLIENT_ID'),
      issuer: configService.get<string>('COGNITO_ISSUER'),
    });
  }

  async validate(payload: any) {
    // In a real application, you would:
    // 1. Verify the token is from your Cognito User Pool
    // 2. Check if the user exists in your database
    // 3. Create the user if they don't exist (auto-registration)
    
    return {
      id: payload.sub,
      username: payload['cognito:username'],
      email: payload.email,
      roles: payload['custom:roles'] ? payload['custom:roles'].split(',') : ['user'],
    };
  }
}