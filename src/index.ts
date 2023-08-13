import express from 'express';
import userRouter from './infrastructure/router/user.router';

const app = express();
app.use(express.json());

app.use('/users', userRouter);

const PORT = 3000;

app.listen(3000, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);

export default app;
