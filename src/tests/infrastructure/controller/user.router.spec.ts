import UserController from '../../../infrastructure/controller/user.controller';
import express from 'express';
import UserUseCase from '../../../domain/usecase/user.usecase';
import { UserRepository } from '../../../infrastructure/repository/user.repository';
import userRouter from '../../../infrastructure/router/user.router';
import request from 'supertest';

const app = express();
app.use(express.json());
app.use('/users', userRouter);

const server = app.listen(0); // Listen on a dynamic port

// jest.mock('../../../infrastructure/repository/user.repository', () => {
//   return {
//     UserRepository: jest.fn().mockImplementation(() => {
//       return {
//         saveUser: jest.fn(),
//         getUsers: jest.fn(),
//       };
//     }),
//   };
// });

jest.mock('../../../domain/usecase/user.usecase', () => {
  return jest.fn().mockImplementation(() => {
    return {
      saveUser: jest.fn().mockImplementation(() => Promise.resolve(true)),
      getUsers: jest.fn().mockImplementation(() => Promise.resolve([])),
    };
  });
});

afterAll(() => {
  server.close();
});

describe('UserRouter', () => {
  // let userController: UserController;
  // let userUseCase: UserUseCase;
  // let userRepository: UserRepository;

  beforeAll(() => {
    // userRepository = new UserRepository();
    // userController = new UserController(userUseCase);
    // userUseCase = new UserUseCase(userRepository);
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should resolve with true', async () => {
    const payload = { name: 'Santiago', email: 'sam@email.com' };
    const response = await request(server).post('/users').send(payload);
    expect(response.body).toMatchObject({ result: true });
    expect(response.status).toBe(201);
  });
  test('should return empty array with 200', async () => {
    const response = await request(server).get('/users');
    expect(response.status).toBe(200);

    expect(response.body).toEqual({ result: [] });
  });

  test('should return a 400 status code', async () => {
    const payload = { name: 'Santiago' };
    const response = await request(server).post('/users').send(payload);
    expect(response.body).toMatchObject({
      message: 'Name and email are required',
    });
    expect(response.status).toBe(400);
  });
});
