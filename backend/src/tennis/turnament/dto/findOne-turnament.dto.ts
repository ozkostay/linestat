import { PartialType } from '@nestjs/mapped-types';
import { CreateTurnamentDto } from './create-turnament.dto';

export class FindOneTurnamentDto extends PartialType(CreateTurnamentDto) {}
