import { UserRepository } from '../../infrastructure/repository/user.repository';

export default class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  saveUser = (name: string, email: string): Promise<boolean> => {
    if (!name || !email) {
      return Promise.resolve(false);
    }
    return this.userRepository.saveUser(name, email);
  };
  getUsers = (): Promise<any[] | null> => {
    return this.userRepository.getUsers();
  };
}
