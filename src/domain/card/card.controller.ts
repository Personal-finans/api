import {
	Body,
	Controller,
	Delete,
	Get,
	Patch,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { ParamId } from '../../decorators/param-id.decorator';
import { User } from '../../decorators/user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { CardService } from './card.service';
import { UpdatePatchCardDTO, UpdatePutCardDTO } from './dto';

@UseGuards(AuthGuard)
@Controller('cards')
export class CardController {
	constructor(private readonly cardService: CardService) {}

	@Post()
	async create(@Body() body, @User() user) {
		return this.cardService.create(body, user);
	}

	@Get()
	async list(@User('id') userId) {
		return this.cardService.list(userId);
	}

	@Get(':id')
	async show(@ParamId('id') id: number) {
		return this.cardService.show(id);
	}

	@Put(':id')
	async update(@Body() body: UpdatePutCardDTO, @ParamId('id') id: number) {
		return this.cardService.update(id, body);
	}

	@Patch(':id')
	async updatePartial(
		@Body() body: UpdatePatchCardDTO,
		@ParamId('id') id: number,
	) {
		return this.cardService.updatePartial(id, body);
	}

	@Delete(':id')
	async delete(@ParamId('id') id: number) {
		return this.cardService.delete(id);
	}
}
