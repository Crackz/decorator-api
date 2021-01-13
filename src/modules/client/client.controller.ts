import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AccessControl } from 'src/app.roles';
import { PaginatedResponse } from '../../common/utils';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ClientService } from './client.service';
import { CreateClientDto } from './dtos/create-client.dto';
import { FindClientsDto } from './dtos/find-clients.dto';
import { UpdateClientDto } from './dtos/update-client.dto';
import { IClientModel } from './interfaces/client.interface';

@ApiTags('Client')
@ApiBearerAuth()
@Controller('clients')
export class ClientController {
	constructor(private readonly _clientService: ClientService) { }

	@Get('/')
	@UseGuards(JwtAuthGuard, ACGuard)
	@UseRoles({
		resource: AccessControl.Resources.CLIENT,
		action: AccessControl.Actions.READ,
		possession: AccessControl.Possessions.ANY
	})
	async getAllPaginated(@Query() query: FindClientsDto = {}): Promise<PaginatedResponse<IClientModel>> {
		if (!query.page) query.page = 1;
		if (!query.limit) query.limit = 20;

		const { data, totalCount } = await this._clientService.getAll(query);

		return new PaginatedResponse<IClientModel>({ data, totalCount, page: query.page, limit: query.limit });
	}

	@Post('/')
	@UseGuards(JwtAuthGuard, ACGuard)
	@UseRoles({
		resource: AccessControl.Resources.CLIENT,
		action: AccessControl.Actions.CREATE,
		possession: AccessControl.Possessions.ANY
	})
	async create(@Body() createClientDto: CreateClientDto): Promise<IClientModel> {
		return await this._clientService.create(createClientDto);
	}


	@Get('/:clientId')
	@UseGuards(JwtAuthGuard, ACGuard)
	@UseRoles({
		resource: AccessControl.Resources.CLIENT,
		action: AccessControl.Actions.READ,
		possession: AccessControl.Possessions.ANY
	})
	async getOne(@Param('clientId') clientId: string): Promise<IClientModel> {
		return await this._clientService.getOne(clientId);
	}


	@Patch('/:clientId')
	@UseGuards(JwtAuthGuard, ACGuard)
	@UseRoles({
		resource: AccessControl.Resources.CLIENT,
		action: AccessControl.Actions.UPDATE,
		possession: AccessControl.Possessions.ANY
	})
	async patch(@Param('clientId') clientId: string, @Body() updateClientDto: UpdateClientDto): Promise<IClientModel> {
		return await this._clientService.patch(clientId, updateClientDto);
	}

	@Delete('/:clientId')
	@UseGuards(JwtAuthGuard, ACGuard)
	@UseRoles({
		resource: AccessControl.Resources.CLIENT,
		action: AccessControl.Actions.DELETE,
		possession: AccessControl.Possessions.ANY
	})
	async delete(@Param('clientId') clientId: string): Promise<void> {
		await this._clientService.delete(clientId);
	}
}
