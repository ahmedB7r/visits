import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './commonServices/prisma.service';

import { EventsModule } from './events/events.module';

import { VisitorController } from './models/visitor/controller';
import { VisitorService } from './models/visitor/service';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { VisitsModule } from './visits/visits.module';
import { UsersModule } from './models/users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
export const jwtSecret = 'zjP9h6ZI5LoSKCRj';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    ConfigModule.forRoot(),
    EventsModule,
    AuthModule,
    UsersModule,

    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '5m' }, // e.g. 30s, 7d, 24h
    }),
    VisitsModule,

  ],

  controllers: [VisitorController],
  providers: [PrismaService, VisitorService],
})
export class AppModule {}
