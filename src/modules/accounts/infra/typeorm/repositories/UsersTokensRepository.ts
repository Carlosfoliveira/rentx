import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUsersTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

import { UserToken } from '../entities/UserToken';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const usersTokens = await this.repository.findOne({
      where: {
        user_id,
        refresh_token,
      },
    });

    return usersTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersTokensRepository };
