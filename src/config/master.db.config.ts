import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Tenancy } from 'src/tenancy/entities/tenancy.entity';

export const MasterDbConfig = (
  config: ConfigService,
): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> => {
  return {
    type: 'mysql', // Tipo de base de datos
    host: config.get('HOST_DB'), // Host de la base de datos
    port: +config.get('PORT_DB'), // Puerto de la base de datos
    username: config.get('USERNAME_DB'), // Usuario de la base de datos
    password: config.get('PASSWORD_DB'), //Contraseña de la base de datos
    database: config.get('DATABASE_DB'), // Nombre de la base de datos
    synchronize: true, // Sincronizar la estructura de la base de datos c
    autoLoadEntities: true,
  };
};
