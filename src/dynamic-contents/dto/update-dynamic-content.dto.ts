import { PartialType } from '@nestjs/mapped-types';
import { CreateDynamicContentDto } from './create-dynamic-content.dto';

export class UpdateDynamicContentDto extends PartialType(CreateDynamicContentDto) {}
