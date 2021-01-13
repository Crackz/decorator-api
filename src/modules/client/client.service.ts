import { Injectable } from '@nestjs/common';
import { PaginatedResult } from 'src/common/models/paginated-result.model';
import { BaseService } from 'src/common/services/base.service';
import { CounterService } from '../counter/counter.service';
import { CounterNames } from '../counter/interfaces/counter.interface';
import { CreateClientDto } from './dtos/create-client.dto';
import { FindClientsDto } from './dtos/find-clients.dto';
import { UpdateClientDto } from './dtos/update-client.dto';
import { IClientModel } from './interfaces/client.interface';
import { ClientRepo } from './repos/client.repo';
import { OrderService } from '../order/order.service';

@Injectable()
export class ClientService extends BaseService {
	constructor(
		private readonly _clientRepo: ClientRepo,
		private readonly _orderService: OrderService,
		private readonly _counterService: CounterService) {
		super(_clientRepo, { isNumberId: true });
	}

	async getAll(query: FindClientsDto): Promise<PaginatedResult<IClientModel>> {
		const sort: any = {};
		if (query.sortByName) sort.name = query.sortByName;
		if (query.sortByAddress) sort.address = query.sortByAddress;
		if (query.sortByPhone) sort.phone = query.sortByPhone;

		return await this._clientRepo.getAll(query, sort);
	}

	async getOne(clientId: string) {
		return await this.checkExist<IClientModel>(clientId, { param: 'clientId' });
	}

	async create(createClientDto: CreateClientDto): Promise<IClientModel> {
		return await this._clientRepo.create({
			...createClientDto,
			_id: await this._counterService.increase(CounterNames.CLIENT)
		});
	}

	async patch(clientId: string, updateClientDto: UpdateClientDto): Promise<IClientModel> {
		await this.checkExist(clientId, { param: 'client' });
		return await this._clientRepo.findByIdAndUpdate(clientId, updateClientDto, { new: true });
	}

	async delete(clientId: string): Promise<void> {
		await this.checkExist(clientId, { param: 'client' });
		await this._clientRepo.deleteOne({ _id: clientId });
		await this._orderService.deleteMany(clientId)
	}
}
