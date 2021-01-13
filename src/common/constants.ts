// Connection Token
export const DB_CONNECTION_TOKEN: string = 'DbConnectionToken';

// Models Names

export const APP_SETTINGS_MODEL_NAME: string = 'app-settings';
export const USER_MODEL_NAME: string = 'user';
export const CLIENT_MODEL_NAME: string = 'client';
export const ORDER_MODEL_NAME: string = 'order';
export const COUNTER_MODEL_NAME: string = 'counter';


// Utils

export enum Errors {
	BadRequest = 'BadRequest',
	Unauthenticated = 'Unauthenticated',
	Unauthorized = 'Unauthorized',
	NotFound = 'NotFound',
	InternalServerError = 'InternalServerError',
	Conflict = 'Conflict',
	UnprocessableEntity = 'UnprocessableEntity',
	Forbidden = 'Forbidden'
}

export enum HttpErrors {
	BadRequest = 400,
	Unauthenticated = 401,
	Unauthorized = 403,
	Forbidden = 403,
	NotFound = 404,
	Conflict = 409,
	UnprocessableEntity = 422,
	InternalServerError = 500
}

export enum Languages {
	AR = 'ar',
	EN = 'en'
}