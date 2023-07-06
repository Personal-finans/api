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
import { Installment } from '@prisma/client';
import { ParamId } from '../../decorators/param-id.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { InstallmentService } from './Installment.service';
import {
	CreateInstallmentDTO,
	UpdatePatchInstallmentDTO,
	UpdatePutInstallmentDTO,
} from './dto';

@UseGuards(AuthGuard)
@Controller('installments')
export class InstallmentsController {
	constructor(private readonly installmentService: InstallmentService) {}
	@Post()
	async create(@Body() body: CreateInstallmentDTO): Promise<Installment> {
		return this.installmentService.create(body);
	}

	@Get()
	async list(): Promise<Installment[]> {
		return this.installmentService.list();
	}
	@Get(':id')
	async show(@ParamId('id') id: number): Promise<Installment> {
		return this.installmentService.show(id);
	}

	@Put(':id')
	async update(
		@Body() body: UpdatePutInstallmentDTO,
		@ParamId('id') id: number,
	) {
		return this.installmentService.update(id, body);
	}

	@Patch(':id')
	async updatePartial(
		@Body() body: UpdatePatchInstallmentDTO,
		@ParamId('id') id: number,
	) {
		return this.installmentService.updatePartial(id, body);
	}

	@Delete(':id')
	async delete(@ParamId('id') id: number): Promise<Installment> {
		return this.installmentService.delete(id);
	}
}
