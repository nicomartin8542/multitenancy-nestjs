import { Module } from '@nestjs/common';
import { TenancyService } from './tenancy.service';
import { TenancyController } from './tenancy.controller';

@Module({
  controllers: [TenancyController],
  providers: [TenancyService]
})
export class TenancyModule {}
