import { Router } from 'express';
import UserUseCase from '../../domain/usecase/user.usecase';
import UserController from '../controller/user.controller';
import { UserRepository } from '../repository/user.repository';

const userRouter = Router();

const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);
const { saveUser, getUsers } = new UserController(userUseCase);

userRouter.post('/', saveUser);
userRouter.get('/', getUsers);

export default userRouter;
