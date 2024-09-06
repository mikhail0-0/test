import { Controller, Inject, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller()
export class AppController {
  @Inject()
  private readonly usersService: UsersService;

  @Post('problems')
  async getProblemsCount(@Res() res: Response): Promise<void> {
    const count = await this.usersService.getProblemsCount();
    res.send({count});
    await this.usersService.falseProblems();
  }
}
