import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

const Domains = [UserModule];

@Module({
	imports: [...Domains],
	exports: [...Domains],
})
export class ModelsModule {}
