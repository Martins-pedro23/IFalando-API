import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { ISearchModel } from 'src/interfaces/ISearchModel';
import { SearchUsersParams } from '../enum/SearchUsersParams';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/service/prisma.service';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute(param: ISearchModel<SearchUsersParams>) {
    try {
      if (!param) {
        throw new HttpException('Params are required', 400);
      }

      const { pageIndex, pageSize } = param;

      const pageIndexParsed = parseInt(pageIndex);
      const pageSizeParsed = parseInt(pageSize);

      if (isNaN(pageIndexParsed) || isNaN(pageSizeParsed)) {
        throw new HttpException('Invalid params', 400);
      }

      let whereStatement: Prisma.UserWhereInput;

      if (
        param.value === undefined ||
        param.value === null ||
        param.value === ''
      ) {
        const result = await this.usersService.findAll(
          pageIndexParsed,
          pageSizeParsed,
          whereStatement,
        );

        if (!result) throw new HttpException('Erro ao buscar artigos.', 500);

        return {
          message: 'Artigos encontrados com sucesso.',
          data: {
            value: result.value,
            count: result.count,
          },
          status: 200,
        };
      }

      switch (param.TypeOfParam) {
        case SearchUsersParams.EMAIL:
          whereStatement = {
            email: {
              contains: param.value,
              mode: 'insensitive',
            },
          };
          break;
        case SearchUsersParams.NAME:
          whereStatement = {
            name: {
              contains: param.value,
              mode: 'insensitive',
            },
          };
          break;
        case SearchUsersParams.PERMISSIONS:
          whereStatement = {
            permission: {
              equals: param.value,
              mode: 'insensitive',
            },
          };
          break;
        case SearchUsersParams.ID:
          whereStatement = {
            userID: {
              equals: parseInt(param.value),
            },
          };
          break;
        default:
          whereStatement = undefined;
      }

      const users = await this.usersService.findAll(
        pageIndexParsed,
        pageSizeParsed,
        whereStatement,
      );

      if (!users) {
        throw new HttpException('Users not found', 404);
      }

      return {
        message: 'Users found',
        status: 200,
        data: users,
      };
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
