import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantDto } from './create-establishment.dto';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {}
