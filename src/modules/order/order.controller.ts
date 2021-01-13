import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import * as makeDir from 'make-dir';
import * as multer from 'multer';
import { ACGuard, UseRoles } from 'nest-access-control';
import * as path from 'path';
import { AccessControl } from 'src/app.roles';
import { HandleImgsInterceptor, UploadImg } from 'src/common/interceptors/imgs-handler.interceptor';
import * as url from 'url';
import * as uuidv4 from 'uuid/v4';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { PaginatedResponse } from '../../common/utils';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderAttachmentsDto } from './dtos/update-order-attachments.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { IOrderModel } from './interfaces/order.interface';
import { OrderService } from './order.service';
import { FindAllOrdersDto } from './dtos/find-all-orders.dto';

@ApiTags('Order')
@ApiBearerAuth()
@Controller('/')
export class OrderController {
	constructor(private readonly _orderService: OrderService) { }

	static getImgsFields = (options = { isUpdate: true }): UploadImg[] => [
		{ name: 'progressImgs', maxCount: Infinity, optional: options.isUpdate, isAllowedUrl: options.isUpdate }
	];

	@Get('/orders')
	@UseGuards(JwtAuthGuard, ACGuard)
	@UseRoles({
		resource: AccessControl.Resources.ORDER,
		action: AccessControl.Actions.READ,
		possession: AccessControl.Possessions.ANY
	})
	async getAllClientsOrdersPaginated(
		@Query() query: FindAllOrdersDto = {},
	): Promise<PaginatedResponse<IOrderModel>> {
		if (!query.page) query.page = 1;
		if (!query.limit) query.limit = 20;

		const { data, totalCount } = await this._orderService.getAllClientsOrders(query);

		return new PaginatedResponse<IOrderModel>({ data, totalCount, page: query.page, limit: query.limit });
	}

	@Get('/clients/:clientId/orders')
	@UseGuards(JwtAuthGuard, ACGuard)
	@UseRoles({
		resource: AccessControl.Resources.ORDER,
		action: AccessControl.Actions.READ,
		possession: AccessControl.Possessions.ANY
	})
	async getAllPaginated(
		@Query() query: PaginationDto = {},
		@Param('clientId') clientId: string
	): Promise<PaginatedResponse<IOrderModel>> {
		if (!query.page) query.page = 1;
		if (!query.limit) query.limit = 20;

		const { data, totalCount } = await this._orderService.getAll(clientId, query);

		return new PaginatedResponse<IOrderModel>({ data, totalCount, page: query.page, limit: query.limit });
	}

	@ApiConsumes('multipart/form-data')
	@Post('/clients/:clientId/orders')
	@UseGuards(JwtAuthGuard, ACGuard)
	@UseRoles({
		resource: AccessControl.Resources.ORDER,
		action: AccessControl.Actions.CREATE,
		possession: AccessControl.Possessions.ANY
	})
	@UseInterceptors(
		FileFieldsInterceptor(OrderController.getImgsFields({ isUpdate: true })),
		HandleImgsInterceptor(OrderController.getImgsFields({ isUpdate: true }))
	)
	async create(@Param('clientId') clientId: string, @Body() createOrderDto: CreateOrderDto): Promise<IOrderModel> {
		return await this._orderService.create(clientId, createOrderDto);
	}

	@Get('/clients/:clientId/orders/:orderId')
	@UseGuards(JwtAuthGuard, ACGuard)
	@UseRoles({
		resource: AccessControl.Resources.ORDER,
		action: AccessControl.Actions.READ,
		possession: AccessControl.Possessions.ANY
	})
	async get(@Param('clientId') clientId: string, @Param('orderId') orderId: string): Promise<IOrderModel> {
		return await this._orderService.get(clientId, orderId);
	}

	@ApiConsumes('multipart/form-data')
	@Patch('/clients/:clientId/orders/:orderId')
	@UseGuards(JwtAuthGuard, ACGuard)
	@UseRoles({
		resource: AccessControl.Resources.ORDER,
		action: AccessControl.Actions.UPDATE,
		possession: AccessControl.Possessions.ANY
	})
	@UseInterceptors(
		FileFieldsInterceptor(OrderController.getImgsFields({ isUpdate: true })),
		HandleImgsInterceptor(OrderController.getImgsFields({ isUpdate: true }))
	)
	async patch(
		@Param('clientId') clientId: string,
		@Param('orderId') orderId: string,
		@Body() updateOrderDto: UpdateOrderDto
	): Promise<IOrderModel> {
		return await this._orderService.patch(clientId, orderId, updateOrderDto);
	}

	@HttpCode(204)
	@Delete('/clients/:clientId/orders/:orderId')
	@UseGuards(JwtAuthGuard, ACGuard)
	@UseRoles({
		resource: AccessControl.Resources.ORDER,
		action: AccessControl.Actions.DELETE,
		possession: AccessControl.Possessions.ANY
	})
	async delete(@Param('clientId') clientId: string, @Param('orderId') orderId: string): Promise<void> {
		await this._orderService.delete(clientId, orderId);
	}

	@HttpCode(204)
	@ApiConsumes('multipart/form-data')
	@Patch('/clients/:clientId/orders/:orderId/attachments')
	@UseGuards(JwtAuthGuard, ACGuard)
	@UseRoles({
		resource: AccessControl.Resources.ORDER,
		action: AccessControl.Actions.UPDATE,
		possession: AccessControl.Possessions.ANY
	})
	@UseInterceptors(
		FileFieldsInterceptor([{ name: 'attachments' }], {
			storage: multer.diskStorage({
				destination: async function (req, file, cb) {
					const dest = path.join(__dirname + '..', '..', '..', '..', process.env.uploadsFolderName);
					await makeDir(dest);
					cb(null, dest);
				},
				filename: function (req, file, cb) {
					cb(null, uuidv4() + path.extname(file.originalname));
				}
			})
		})
	)
	async patchAttachments(@Req() req, @Body() updateOrderAttachmentsDto: UpdateOrderAttachmentsDto): Promise<void> {
		const { clientId, orderId } = req.params;
		const appUrl = url.format({
			protocol: req.protocol,
			host: req.get('HOST')
		});

		await this._orderService.patchAttachments(clientId, orderId, req.files, updateOrderAttachmentsDto, {
			appUrl,
			dest: process.env.uploadsFolderName
		});
	}
}
