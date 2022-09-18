import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userrepository: Repository<User>,
  ) {}

  async create(input) {
    //email 중복 확인
    const finduser = await this.userrepository.find({
      where: {
        email: input.email,
      },
    });
    //email 중복 시 409 error 반환
    if (finduser.length) {
      throw new ConflictException('중복된 email입니다');
    }
    //user 생성
    return await this.userrepository.save(input);
  }
}
