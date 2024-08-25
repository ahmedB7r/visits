import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Visit, VisitStatus } from '@prisma/client';
import { PrismaService } from 'src/commonServices/prisma.service';
import {
  PaginatedResult,
  PaginateFunction,
  paginator,
} from 'src/utils/paginator';
import { AddVisitDto } from './visits.controller';
const paginate: PaginateFunction = paginator({ perPage: 1000 });

@Injectable()
export class VisitsService {
  constructor(private prisma: PrismaService) {}
  async visits({
    where,
    orderBy,
    page,
  }: {
    where?: Prisma.VisitWhereInput;
    orderBy?: Prisma.VisitOrderByWithRelationInput;
    page?: number;
  }): Promise<PaginatedResult<Visit>> {
    return paginate(
      this.prisma.visit,
      {
        where,
        orderBy: [
          orderBy || {},

          {
            createdAt: 'asc',
          },
        ],
        include: {
          visitor: true,
        },
      },
      {
        page,
      },
    );
  }

  async addVisit({
    data,
    officeId,
  }: {
    data: AddVisitDto;
    officeId;
  }): Promise<Visit> {
    const { visitorId, desc, ...rest } = data;
    return this.prisma.visit.create({
      data: {
        ...rest,
        desc,
        // arrivedAt: new Date(),
        visitor: {
          connect: {
            id: Number(visitorId),
          },
        },
        office: {
          connect: {
            id: officeId,
          },
        },
      },
    });
  }

  async updateVisit({
    data,
    id,
  }: {
    data: { status: VisitStatus };
    id: number;
  }): Promise<Visit> {
    return this.prisma.visit.update({
      where: {
        id,
      },
      data,
    });
  }
}
