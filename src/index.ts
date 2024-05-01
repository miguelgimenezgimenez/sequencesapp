import 'dotenv/config'
import App from './app';
import PostRouter from './api/posts/PostRouter';
import UserRouter from './api/users/UserRouter';


import { PORT, NODE_ENV } from './config';

import IDatabase from './database/interfaces/IDatabase';
import DIContainer from './di/diContainer';
import DI_TYPES from './di/DITypes';


const initializeServer = async (): Promise<void> => {
    const app = await new App().config([
        new PostRouter(),
        new UserRouter()
    ]);
    const server = app.listen(PORT, () => {
        if (NODE_ENV === 'development') {
            console.log(`💻 Started on http://localhost:${PORT}`);
        } else {
            console.log(`💻 Started on port ${PORT}`);
        }
    });
    const db = DIContainer.get<IDatabase>(DI_TYPES.Database)

    db.getConnection().on('error', (error: Error) => console.error('MongoDB connection error:', error));
    server.on('error', (error) => {
        console.log(error);
    });
}
initializeServer()



