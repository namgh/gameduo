import { Body, Controller, Post } from '@nestjs/common';
import { BossService } from './boss.service';

@Controller('boss')
export class BossController {
  constructor(private readonly bossservice: BossService) {}

  @Post('start')
  start(@Body() userid: string) {
    return this.bossservice.start({ userid });
  }
}
