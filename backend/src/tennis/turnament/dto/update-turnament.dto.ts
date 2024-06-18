import { PartialType } from '@nestjs/mapped-types';
import { CreateTurnamentDto } from './create-turnament.dto';

export class UpdateTurnamentDto extends PartialType(CreateTurnamentDto) {}
