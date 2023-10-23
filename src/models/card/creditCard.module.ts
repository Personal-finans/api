import { Module } from '@nestjs/common';
import { AuthModule } from '../../auth/auth.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { CreditCardController } from './creditCard.controller';
import { CreditCardService } from './creditCard.service';

@Module({
	imports: [PrismaModule, UserModule, AuthModule],
	controllers: [CreditCardController],
	providers: [CreditCardService],
	exports: [CreditCardModule],
})
export class CreditCardModule {}
