import 'dotenv/config';
import App from './app';

import UserRouter from './api/user/UserRouter';

import { PORT, NODE_ENV } from './config';

import IDatabase from './database/interfaces/IDatabase';
import DIContainer from './di/diContainer';
import DI_TYPES from './di/DITypes';
import SequenceRouter from './api/sequence/SequenceRouter';

const initializeServer = async (): Promise<void> => {
  const app = await new App().config([new UserRouter(), new SequenceRouter()]);
  const server = app.listen(PORT, () => {
    if (NODE_ENV === 'development') {
      console.log(`💻 Started on http://localhost:${PORT}`);
    } else {
      console.log(`💻 Started on port ${PORT}`);
    }
  });
  const db = DIContainer.get<IDatabase>(DI_TYPES.Database);

  db.getConnection().on('error', (error: Error) =>
    console.error('MongoDB connection error:', error),
  );
  server.on('error', error => {
    console.log(error);
  });
};
initializeServer();
