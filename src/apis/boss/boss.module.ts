import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { BossController } from './boss.controller';
import { BossService } from './boss.service';
import { Boss } from './entities/boss.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Boss])],
  controllers: [BossController],
  providers: [BossService],
})
export class BossModule {}
