import { HttpModule, Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      baseURL: process.env.EMAIL_SERVICE_URL || 'http://localhost:8012',
    }),
  ],
  providers: [EmailService],
  exports: [HttpModule],
})
export class EmailModule {}
