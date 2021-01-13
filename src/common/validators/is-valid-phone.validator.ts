// import {
// 	registerDecorator,
// 	ValidationArguments,
// 	ValidationOptions,
// 	ValidatorConstraint,
// 	ValidatorConstraintInterface
// } from 'class-validator';
// import PhoneNumber from 'awesome-phonenumber';

// @ValidatorConstraint({ name: 'isValidPhone' })
// class IsValidPhoneConstraint implements ValidatorConstraintInterface {
// 	validate(value: any, args: ValidationArguments) {
// 		// Return False if it failed to be parsed.
// 		if (!value) return false;

// 		const phoneNo = new PhoneNumber(value);
// 		if (phoneNo.isValid() && phoneNo.canBeInternationallyDialled()) return true;
// 		return false;
// 	}

// 	defaultMessage(args: ValidationArguments) {
// 		return `Invalid International Phone Number: ${args.value}`;
// 	}
// }

// export function IsValidPhone(validationOptions?: ValidationOptions) {
// 	return function(object: Object, propertyName: string) {
// 		registerDecorator({
// 			target: object.constructor,
// 			propertyName: propertyName,
// 			options: validationOptions,
// 			constraints: [],
// 			validator: IsValidPhoneConstraint
// 		});
// 	};
// }
