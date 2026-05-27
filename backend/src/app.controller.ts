import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status')
  getStatus() {
    return this.appService.getStatus();
  }

  @Get('query')
  async query(@Query('prompt') prompt = 'Hello from NestJS') {
    return this.appService.query(prompt);
  }
}
