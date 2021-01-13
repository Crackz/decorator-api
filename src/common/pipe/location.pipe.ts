import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import * as _ from 'lodash';
import { ILocation, ILocationModel } from '../../common/interfaces/location.interface';

export class ParseLocationsPipe implements PipeTransform {
    constructor(private locationPaths: string | string[]) { }

    transform(incomingData: object, metadata: ArgumentMetadata) {

        if (!Array.isArray(this.locationPaths))
            this.locationPaths = [this.locationPaths];


        for (let locationPath of this.locationPaths) {
            const incomingLocationData: ILocation = _.get(incomingData, locationPath)
            if (incomingLocationData) {
                let parsedLocation: ILocationModel = {
                    coordinates: [incomingLocationData.lng, incomingLocationData.lng],
                    type: 'Point'
                }
                _.set(incomingData, locationPath, parsedLocation);
            }


        }

        return incomingData;
    }
}