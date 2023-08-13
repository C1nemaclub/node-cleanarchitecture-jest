import { UserEntity } from './user.entity';

export class UserValue implements UserEntity {
  id?: string | undefined;
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
    this.id = Math.random().toString(36);
  }
}
