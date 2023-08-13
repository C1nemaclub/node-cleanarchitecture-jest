import UserUseCase from '../../../domain/usecase/user.usecase';
import { UserRepository } from '../../../infrastructure/repository/user.repository';

jest.mock('../../../infrastructure/repository/user.repository', () => {
  return {
    UserRepository: jest.fn().mockImplementation(() => {
      return {
        saveUser: jest.fn().mockImplementation(() => Promise.resolve(true)),
        getUsers: jest.fn().mockImplementation(() => Promise.resolve([])),
      };
    }),
  };
});

describe('UseCase', () => {
  test('should save user and return true', async () => {
    const userRepository = new UserRepository();
    const userUseCase = new UserUseCase(userRepository);
    const payload = { name: 'Santiago', email: 'santiago@emai.com' };
    const result = await userUseCase.saveUser(payload.name, payload.email);
    expect(userRepository.saveUser).toHaveBeenCalledTimes(1);
    expect(userRepository.saveUser).toHaveBeenCalledWith(
      payload.name,
      payload.email
    );
    expect(result).toBe(true);
  });

  test('should return false if name is missing', async () => {
    const userRepository = new UserRepository();
    const userUseCase = new UserUseCase(userRepository);
    const payload = { name: '', email: 'santiago@emai.com' };
    const result = await userUseCase.saveUser(payload.name, payload.email);

    expect(userRepository.saveUser).not.toHaveBeenCalledTimes(1);
    expect(result).toBe(false);
  });

  test('should return the array', async () => {
    const userRepository = new UserRepository();
    const userUseCase = new UserUseCase(userRepository);
    const result = await userUseCase.getUsers();
    expect(userRepository.getUsers).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });
});
