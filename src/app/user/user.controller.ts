import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { IndexUserSwagger } from './swagger/index-user.swagger';
import { CreateUserSwagger } from './swagger/create-user.swagger';
import { ShowUserSwagger } from './swagger/show-user.swagger';
import { UpdateUserSwagger } from './swagger/update-user.swagger';
import { BadRequestSwagger } from '../../helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from '../../helpers/swagger/not-found.swagger';

@Controller('api/usuario')
@ApiTags('Usuários')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Listagem de todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários',
    type: IndexUserSwagger,
    isArray: true,
  })
  async index() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
    type: ShowUserSwagger,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiOperation({ summary: 'Listagem de apenas um usuário' })
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criação de usuário' })
  @ApiResponse({
    status: 200,
    description: 'Novo usuário criado com sucesso!',
    type: CreateUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: BadRequestSwagger,
  })
  async create(@Body() body: CreateUser) {
    return await this.userService.create(body);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso!',
    type: UpdateUserSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: BadRequestSwagger,
  })
  @ApiOperation({ summary: 'Atualização de dados de um usuário' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUser,
  ) {
    return await this.userService.update(id, body);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso!' })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: NotFoundSwagger,
  })
  @ApiOperation({ summary: 'Deleção de um usuário' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.deleteById(id);
  }
}
