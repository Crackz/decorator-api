import { IsDefined, IsNumber, IsNotEmpty } from "class-validator";
import { IsLongitude, IsLatitude } from "../validators";
import { Type } from "class-transformer";

export class LocationDto {
	@IsDefined()
	@IsNotEmpty()
	@IsNumber()
	@IsLongitude()
	@Type(()=> Number)
	lng: number;

	@IsDefined()
	@IsNotEmpty()
	@IsNumber()
	@IsLatitude()
	@Type(()=> Number)
	lat: number;
}