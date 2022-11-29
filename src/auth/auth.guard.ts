import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as admin from 'firebase-admin';
import { IS_PUBLIC_KEY } from './auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private readonly logger = new Logger(AuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (isPublic) return true;

      const request = context.switchToHttp().getRequest();

      // Retrive token from header
      const authHeader = request.headers.authorization;
      if (!authHeader) throw new UnauthorizedException();

      const token = authHeader.split(' ')[1];

      const decodedValue = await admin.auth().verifyIdToken(token);

      if (!decodedValue) throw new UnauthorizedException();

      this.logger.log('Token is valid');

      request.user = decodedValue;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
