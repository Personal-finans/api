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
import { Expense, Profile } from '@prisma/client';
import { ParamId } from '../../decorators/param-id.decorator';
import { User } from '../../decorators/user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import {
	CreateExpenseDTO,
	UpdatePatchExpenseDTO,
	UpdatePutExpenseDTO,
} from './dto';
import { ExpenseService } from './expense.service';

@UseGuards(AuthGuard)
@Controller('expenses')
export class ExpenseController {
	constructor(private readonly expenseService: ExpenseService) {}

	@Post()
	async create(@Body() body: CreateExpenseDTO, @User() user): Promise<Expense> {
		return this.expenseService.create(body, user);
	}

	@Get()
	async list(@User('profile') { id: profileId }: Profile): Promise<Expense[]> {
		return this.expenseService.list(profileId);
	}

	@Get('/statistics')
	async statistics(@User('profile') { id: profileId }: Profile) {
		return this.expenseService.statistics(profileId);
	}

	@Get(':id')
	async show(@ParamId('id') id: number): Promise<Expense> {
		return this.expenseService.show(id);
	}

	@Put(':id')
	async update(
		@Body() body: UpdatePutExpenseDTO,
		@ParamId('id') id: number,
	): Promise<Expense> {
		return this.expenseService.update(id, body);
	}

	@Patch(':id')
	async updatePartial(
		@Body() body: UpdatePatchExpenseDTO,
		@ParamId('id') id: number,
	): Promise<Expense> {
		return this.expenseService.updatePartial(id, body);
	}

	@Delete(':id')
	async delete(@ParamId('id') id: number): Promise<Expense> {
		return this.expenseService.delete(id);
	}
}
