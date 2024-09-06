import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Semaphore } from 'async-mutex';

@Injectable()
export class UsersService {
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  private readonly problemsCoundSemaphore = new Semaphore(1);

  async getProblemsCount(): Promise<number> {
    if (this.problemsCoundSemaphore.isLocked()) {
      return 0;
    }
    return await this.userRepository.countBy({ problems: true });
  }

  async falseProblems(): Promise<void> {
    await this.problemsCoundSemaphore.runExclusive(async () => {
      await this.userRepository.update({}, { problems: false });
    });
  }
}
