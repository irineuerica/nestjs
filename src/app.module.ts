import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: Number(configService.get('DB_PORT', 3306)),
        username: configService.get('DB_USER','root'),
        password: configService.get('DB_PASSWORD','irineu1910'),
        database: configService.get('DB_DATABASE', 'nest'), 
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: true,
      })
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
