import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { VisitsService } from './visits.service';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { VisitStatus } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EventsGateway } from 'src/events/events.gateway';
class QueryVisitsDto {
  @ApiProperty({ required: false })
  page?: number;
}

export class AddVisitDto {
  @ApiProperty()
  visitorId: number;
  @ApiProperty()
  desc?: string;
}
export class UpdateVisitDto {
  @ApiProperty()
  status: VisitStatus;
}
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Visits')
@Controller('visits')
export class VisitsController {
  constructor(
    private readonly visitsService: VisitsService,
    private readonly eventsGateway: EventsGateway,
  ) {}
  @Get()
  async getVisitors(@Request() req, @Query() query: QueryVisitsDto) {
    console.log('🚀 ~ VisitsController ~ getVisitors ~ req:', req);
    const { page } = query;

    return await this.visitsService.visits({
      page,
      where: {
        officeId: req.user.officeId,
        status: {
          not: {
            equals: 'out',
          },
        },
      },
    });
  }
  @Post()
  @ApiBody({ type: AddVisitDto })
  async addVisitor(@Request() req, @Body() data: AddVisitDto) {
    const visit = await this.visitsService.addVisit({
      data,
      officeId: req.user.officeId,
    });

    this.eventsGateway.server.emit(req.user.officeId, {
      event: 'addVisit',
      data: visit,
    });

    return visit;
  }

  @Put(':id')
  @ApiBody({ type: UpdateVisitDto })
  async updateVisitor(
    @Request() req,
    @Body() data: UpdateVisitDto,
    @Param('id') id: number,
  ) {
    const visit = await this.visitsService.updateVisit({
      data,
      id: Number(id),
    });

    this.eventsGateway.server.emit(req.user.officeId, {
      event: 'updateVisit',
      data: visit,
    });

    return visit;
  }
}
