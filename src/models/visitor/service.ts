import { Injectable } from '@nestjs/common';
import { Prisma, Visitor } from '@prisma/client';
import { PrismaService } from 'src/commonServices/prisma.service';
import {
  PaginatedResult,
  PaginateFunction,
  paginator,
} from 'src/utils/paginator';
import { AddVisitorDto, UpdateVisitorDto } from './controller';

const paginate: PaginateFunction = paginator({ perPage: 1000 });

@Injectable()
export class VisitorService {
  constructor(private prisma: PrismaService) {}
  async visitors({
    where,
    orderBy,
    page,
  }: {
    where?: Prisma.VisitorWhereInput;
    orderBy?: Prisma.VisitorOrderByWithRelationInput;
    page?: number;
  }): Promise<PaginatedResult<Visitor>> {
    return paginate(
      this.prisma.visitor,
      {
        where,
        orderBy: [
          orderBy || {},

          {
            createdAt: 'desc',
          },
        ],
      },
      {
        page,
      },
    );
  }
  async addVisitor({ data }: { data: AddVisitorDto }): Promise<Visitor> {
    const { name, rank, ...rest } = data;
    return this.prisma.visitor.create({
      data: {
        ...rest,
        name,
        rank,
      },
    });
  }

  async deleteVisitor({ id }: { id: number }): Promise<Visitor> {
    return this.prisma.visitor.delete({
      where: {
        id,
      },
    });
  }

  async updateVisitor({
    id,
    data,
  }: {
    id: number;
    data: UpdateVisitorDto;
  }): Promise<Visitor> {
    const { name, rank, ...rest } = data;
    return this.prisma.visitor.update({
      where: {
        id,
      },
      data: {
        ...rest,
        name,
        rank,
      },
    });
  }
}
