import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { flatten } from 'flat';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PaginatedResult } from 'src/common/models/paginated-result.model';
import { BaseService } from 'src/common/services/base.service';
import { ApiErrors } from '../../common/utils';
import { ClientService } from '../client/client.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderAttachmentsDto } from './dtos/update-order-attachments.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { IOrderModel, OrderStatus } from './interfaces/order.interface';
import { OrderRepo } from './repos/order.repo';
import { FindAllOrdersDto } from './dtos/find-all-orders.dto';

@Injectable()
export class OrderService extends BaseService {
	constructor(
		private readonly _orderRepo: OrderRepo,
		@Inject(forwardRef(() => ClientService))
		private readonly _clientService: ClientService) {
		super(_orderRepo);
	}

	async getAllClientsOrders(query: FindAllOrdersDto): Promise<PaginatedResult<IOrderModel>> {
		const findQuery: { status?: { $in: OrderStatus[] }, client?: { $exists: boolean } } = {};
		if (query.status)
			findQuery.status = { $in: Array.isArray(query.status) ? query.status : [query.status] };

		return await this._orderRepo.findPaginated(
			findQuery as any,
			{
				page: query.page,
				limit: query.limit,
				sort: { updatedAt: -1 },
				populate: [{ path: 'client' }]
			}
		);
	}

	async getAll(clientId: string, query: PaginationDto): Promise<PaginatedResult<IOrderModel>> {
		return await this._orderRepo.findPaginated(
			{ client: clientId },
			{ ...query, sort: { createdAt: -1 }, populate: [{ path: 'client' }] }
		);
	}

	async get(clientId: string, orderId: string): Promise<IOrderModel> {
		const order = await this._orderRepo.findOne(
			{ client: clientId, _id: orderId },
			{ populate: [{ path: 'client' }] }
		);
		if (!order) throw ApiErrors.NotFound({ param: 'order' });

		return order;
	}

	async create(clientId: string, createOrderDto: CreateOrderDto): Promise<IOrderModel> {
		await this._clientService.checkExist(clientId, { param: 'clientId' });
		return await this._orderRepo.create({ ...createOrderDto, client: clientId });
	}

	async patch(clientId: string, orderId: string, updateOrderDto: UpdateOrderDto): Promise<IOrderModel> {
		await this._orderRepo.findOneAndUpdate({ client: clientId, _id: orderId }, updateOrderDto);
		return await this.get(clientId, orderId);
	}

	async delete(clientId: string, orderId: string): Promise<void> {
		await this._orderRepo.deleteOne({ client: clientId, _id: orderId });
	}

	async deleteMany(clientId: string) {
		await this._orderRepo.deleteMany({ client: clientId });
	}

	async patchAttachments(
		clientId: string,
		orderId: string,
		uploadedFiles: { attachments?: any[] },
		updateOrderAttachmentsDto: UpdateOrderAttachmentsDto = {},
		filesOpts: { appUrl: string; dest: string }
	): Promise<void> {
		if (!updateOrderAttachmentsDto.attachments) updateOrderAttachmentsDto.attachments = [];
		if (uploadedFiles && uploadedFiles.attachments && uploadedFiles.attachments.length > 0) {
			for (let uploadedAttachment of uploadedFiles.attachments) {
				updateOrderAttachmentsDto.attachments.push(
					`${filesOpts.appUrl}/${filesOpts.dest}/${uploadedAttachment.filename}`
				);
			}
		}

		await this._orderRepo.findOneAndUpdate({ client: clientId, _id: orderId }, updateOrderAttachmentsDto, {
			new: true
		});
	}
}
