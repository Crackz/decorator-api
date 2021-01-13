import { Schema } from 'mongoose';
import { ILocationModel, ILocation } from '../interfaces/location.interface';

export const LocationSchema = new Schema(
	{
		type: { type: String, default: 'Point' },
		coordinates: { type: [ Number ] }
	},
	{ _id: false }
);

export function locationSetterHandler(incomingLocationData): ILocationModel {
	if (incomingLocationData.type === 'Point') return incomingLocationData;
	return {
		coordinates: [ incomingLocationData.lng, incomingLocationData.lat ],
		type: 'Point'
	};
}

function locationGetterHandler(geoJsonLocation): ILocation {
	return geoJsonLocation && { lng: geoJsonLocation.coordinates[0], lat: geoJsonLocation.coordinates[1] };
}

export function registerLocationTransformersOnSchema({ path, schema }: { path: string; schema: Schema }) {
	schema.path(path, {
		set: locationSetterHandler,
		get: locationGetterHandler
	});
}
