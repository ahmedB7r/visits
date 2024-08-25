import { Module } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { VisitsController } from './visits.controller';
import { PrismaService } from 'src/commonServices/prisma.service';
import { EventsGateway } from 'src/events/events.gateway';

@Module({
  controllers: [VisitsController],
  providers: [VisitsService, PrismaService, EventsGateway],
})
export class VisitsModule {}
