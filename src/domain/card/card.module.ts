import { Module } from '@nestjs/common';
import { AuthModule } from '../../auth/auth.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { CardController } from './card.controller';
import { CardService } from './card.service';

@Module({
	imports: [PrismaModule, UserModule, AuthModule],
	controllers: [CardController],
	providers: [CardService],
	exports: [CardModule],
})
export class CardModule {}
