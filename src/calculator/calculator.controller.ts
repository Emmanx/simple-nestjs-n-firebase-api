import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { Public } from 'src/auth/auth.decorator';
import { CalculatorService } from './calculator.service';
import { OperationpDto } from './dto/operation.dto';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post()
  async calculate(@Request() req, @Body() body: OperationpDto) {
    return this.calculatorService.calculate(req.user, body);
  }

  @Get('history')
  @Public()
  async getHistory() {
    return this.calculatorService.history();
  }
}
