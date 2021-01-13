import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator';
import * as moment from 'moment';

@ValidatorConstraint({ name: 'isTimestamp' })
class IsTimestampConstraint implements ValidatorConstraintInterface {
	validate(value: any, args: ValidationArguments) {
		const recievedDate = moment.unix(+value);
		return moment().subtract(5, 'minutes').isBefore(recievedDate);
	}

	defaultMessage(args: ValidationArguments) {
		return `your value:${args.value} should be unix timestamp and have not pass the last 5 minutes`
	}
}

export function IsTimestamp(validationOptions?: ValidationOptions) {
	return function(object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsTimestampConstraint
		});
	};
}
