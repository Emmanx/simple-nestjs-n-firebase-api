import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  async signup(body: SignupDto) {
    const user = await admin.auth().createUser(body);

    return {
      data: user,
      meta: null,
      message: 'User created successfully',
    };
  }
}
