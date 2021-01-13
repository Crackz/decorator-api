import { Document, QueryCursor } from 'mongoose';
import { ILocation } from './location.interface';

export type GetSearchDocumentQueryArgs = {
	nearPoint: ILocation;
	configurations: {
		deltaBetweenDropOffLocationAndDeliveryGuyInKm: number;
	};
	specificOnes?: string[] | undefined;
};
export interface ISearchableRepo<T extends Document> {
	getSearchCursor({
		nearPoint,
		configurations,
		specificOnes
	}: GetSearchDocumentQueryArgs): QueryCursor<T>;
}
