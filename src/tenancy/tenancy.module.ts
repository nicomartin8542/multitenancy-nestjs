import { Module } from '@nestjs/common';
import { TenancyService } from './tenancy.service';
import { TenancyController } from './tenancy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenancy } from './entities/tenancy.entity';

@Module({
  controllers: [TenancyController],
  providers: [TenancyService],
  imports: [TypeOrmModule.forFeature([Tenancy])],
})
export class TenancyModule {}
