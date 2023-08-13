import { UserGateway } from '../../domain/gateway/user.gateway';
import { UserEntity } from '../../domain/user/user.entity';
import { UserValue } from '../../domain/user/user.value';

export class UserRepository implements UserGateway {
  saveUser(name: string, email: string): Promise<boolean> {
    new UserValue(name, email);
    return new Promise((resolve) => resolve(true));
  }
  getUsers(): Promise<UserEntity[] | null> {
    const user = new UserValue('John Doe', 'john@example');
    return new Promise((resolve) => resolve([user]));
  }
}
