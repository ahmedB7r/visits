import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { VisitorService } from './service';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';

import { EventsGateway } from 'src/events/events.gateway';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { EventsGateway } from 'src/events/events.gateway';
class QueryVisitorsDto {
  @ApiProperty({ required: false })
  page?: number;
}
export class AddVisitorDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  rank: string;
}
export class UpdateVisitorDto {
  @ApiProperty()
  name?: string;
  @ApiProperty()
  rank?: string;
}
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Visitors')
@Controller('visitors')
export class VisitorController {
  constructor(
    private readonly visitorService: VisitorService,
    // private readonly eventsGateway: EventsGateway,
    // private readonly gateway: EventsGateway,
  ) {}
  // @SubscribeMessage('events')
  @Get()
  async getVisitors(@Query() query: QueryVisitorsDto) {
    const { page } = query;

    return await this.visitorService.visitors({
      page,
    });
  }
  @Post()
  @ApiBody({ type: AddVisitorDto })
  async addVisitor(@Body() data: AddVisitorDto) {
    return await this.visitorService.addVisitor({
      data,
    });
  }

  @Delete(':id')
  async deleteVisitor(@Param('id') id: number) {
    return await this.visitorService.deleteVisitor({
      id: Number(id),
    });
  }

  @Put(':id')
  @ApiBody({ type: UpdateVisitorDto })
  async updateVisitor(@Body() data: UpdateVisitorDto, @Param('id') id: number) {
    return await this.visitorService.updateVisitor({
      data,
      id: Number(id),
    });
  }
}
