import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenancyModule } from './tenancy/tenancy.module';
import { Tenancy } from './tenancy/entities/tenancy.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MasterDbConfig } from './config/master.db.config';
import { SchemaEnv } from './config/schema.env';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: MasterDbConfig,
    }),
    TenancyModule,
    ConfigModule.forRoot({
      validationSchema: SchemaEnv,
    }),
  ],
})
export class AppModule {
  static port: number;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get('PORT');
  }
}
