import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boss } from './entities/boss.entity';
import { Cache } from 'cache-manager';
import axios from 'axios';
import { User } from '../user/entities/user.entity';
@Injectable()
export class BossService {
  constructor(
    @InjectRepository(Boss)
    private readonly bossrepo: Repository<Boss>,

    @InjectRepository(User)
    private readonly userrepo: Repository<User>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache, // private readonly gamestatic = axios.get( //   'https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json', // ),
  ) {}

  async static_redis_set() {
    const tstatic = await axios.get(
      'https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json',
    );

    const result = {};
    tstatic.data.bossRaids[0].levels.sort((a, b) => {
      return a.level - b.level;
    });
    for (let i = 0; i < tstatic.data.bossRaids[0].levels.length; i++) {
      result[`level${tstatic.data.bossRaids[0].levels[i].level}`] =
        tstatic.data.bossRaids[0].levels[i].score;
    }
    result['second'] = tstatic.data.bossRaids[0].bossRaidLimitSeconds;

    result['canenter'] = true;
    await this.cacheManager.set('check', result, { ttl: 0 });
  }

  async start({ userid }) {
    const check = await this.cacheManager.get('check');
    if (!check) await this.static_redis_set();

    if (check.canenter !== true) throw new ConflictException('동시입장 불가능');

    check.canenter = userid;

    await this.cacheManager.set('check', check, { ttl: 0 });
    return '입장되었습니다';
  }

  async findbossraid() {
    const check = await this.cacheManager.get('check');
    if (!check)
      return {
        canteter: true,
      };

    if (check.canenter === true)
      return {
        canenter: true,
      };

    return {
      canenter: false,
      userid: check.canenter,
    };
  }

  async boss_end({ input }) {
    const ranking = await this.cacheManager.get('ranking');
    const check = await this.cacheManager.get('check');

    check.canenter = true;
    await this.cacheManager.set('check', check, { ttl: 0 });

    const { userid, ...rest } = input;
    let j = rest.reduce((a, c) => a + c);

    const user = await this.userrepo.findOne({ where: { id: userid } });
    await this.userrepo.save({ ...user, score: j });
    if (!ranking) {
      const temp = {};
      temp['userid'] = j;
      return await this.cacheManager.set('ranking', temp, { ttl: 0 });
    }
    if (ranking['userid'] < j) return '종료되었습니다';

    ranking['userid'] = j;
    await this.cacheManager.set('ranking', ranking, { ttl: 0 });
    return '종료되었습니다';
  }
}
