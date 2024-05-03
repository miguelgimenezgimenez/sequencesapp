import 'express-async-errors';
// Importing this package will catch all errors that are thrown in async functions and pass them to the next() function which will then be handled by our error handler middleware.
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import { rateLimit } from 'express-rate-limit';
import correlator from 'express-correlation-id';

import errorHandler from './middlewares/errorHandler';
import jwtStrategy from './auth/jwtStrategy';
import { IAppRouter } from './api/BaseRouter';
import DIContainer from './di/diContainer';
import UserService from './api/user/UserService';
import MongoDatabase from './database/mongo/MongoDatabase';
import MongoDataService from './database/mongo/MongoDataService';
import Logger from './lib/Logger';

import DI_TYPES from './di/DITypes';
import { NODE_ENV, CLIENT_ORIGIN, MONGO_DB_URI } from './config';
import IDatabase from './database/interfaces/IDatabase';
import SequenceService from './api/sequence/SequenceService';

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
  }

  private async initializeDependencies() {
    DIContainer.initialize();
    await this.initializeDatabase(MONGO_DB_URI);
    this.initializeServices();
  }

  private async initializeDatabase(uri: string) {
    const database = new MongoDatabase(uri);
    DIContainer.bind(DI_TYPES.Database, database);

    await database.connect();
    database.loadModels();
    return database;
  }

  private initializeServices() {
    const database = DIContainer.get<IDatabase>(DI_TYPES.Database);

    const dataService = new MongoDataService(database);
    DIContainer.bind(DI_TYPES.DataService, dataService);

    const userService = new UserService(dataService);
    DIContainer.bind(DI_TYPES.UserService, userService);

    const sequenceService = new SequenceService(dataService);
    DIContainer.bind(DI_TYPES.SequenceService, sequenceService);

    const logger = new Logger();
    DIContainer.bind(DI_TYPES.Logger, logger);
  }

  public async config(routers: IAppRouter[]): Promise<express.Application> {
    await this.initializeDependencies();

    // CORS (Cross Origin Resource Sharing)
    this.app.use(
      cors({
        origin: [CLIENT_ORIGIN],
      }),
    );

    // Security headers
    this.app.use(helmet());

    // Parse incoming requests with JSON payload
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Rate limit
    this.app.use(
      '/api',
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: 'draft-7', // Set `RateLimit` and `RateLimit-Policy` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      }),
    );
    this.app.use(correlator());
    // Logging
    const format =
      NODE_ENV !== 'production'
        ? 'dev'
        : '[:date[clf]] :method :url :status :res[content-length] - :response-time ms';
    const logger = DIContainer.get<Logger>(DI_TYPES.Logger);

    const morganOption = {
      stream: {
        write: (message: any) => {
          // Use the Winston logger here
          logger.info(message);
        },
      },
    };
    this.app.use(morgan(format, morganOption));

    // Authentication
    this.app.use(passport.initialize());
    passport.use('jwt', jwtStrategy);
    // Routers
    routers.forEach((router: IAppRouter) => {
      this.app.use(`/api/${router.getPath()}`, router.createRouter());
    });

    // Error handler
    this.app.use(errorHandler);
    return this.app;
  }
}

export default App;
