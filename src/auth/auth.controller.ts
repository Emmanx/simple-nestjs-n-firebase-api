import { Body, Controller, Post } from '@nestjs/common';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Public()
  async signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }
}
