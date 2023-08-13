import { Request, Response } from 'express';
import UserUseCase from '../../domain/usecase/user.usecase';

export default class UserController {
  constructor(private readonly userUseCase: UserUseCase) {
    this.userUseCase = userUseCase;
  }

  saveUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        res.status(400).json({ message: 'Name and email are required' });
        return;
      }
      const result = await this.userUseCase.saveUser(name, email);
      res.status(201).json({ result });
    } catch (e) {
      res.status(500).json({ message: 'There was an error saving an user' });
    }
  };
  getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.userUseCase.getUsers();
      res.status(200).json({ result });
    } catch (e: unknown) {
      if (e instanceof Error) console.log(e.message);
      res.status(500).json({ message: 'There was an error getting users' });
    }
  };
}
