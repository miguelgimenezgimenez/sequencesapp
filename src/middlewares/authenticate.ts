import type { Handler } from 'express';
import passport from 'passport';

import { IUser, Role } from '../models/user';
import CustomError from '../utils/errors/CustomError';


const authenticate = (roles?: Role[]) => {
  const handler: Handler = (req, res, next) => {
    passport.authenticate('jwt',
      { session: false },
      (error: any, user: IUser) => {
        try {
          if (error) {
            return res.status(500).send({
              detail: "Server error",
            });
          }
          if (!user) {
            throw new CustomError('Unauthorized', 401)
          }
          // check if user has the right role (right now this is useless but here is where we could check that)
          if (roles) {
            const isAllowed = roles.some((role) => user.role === role);
            if (!isAllowed) {
              throw new CustomError('Unauthorized', 401)
            }
          }
          req.user = user;
          return next();
        } catch (error) {
          // This try catch seems unnecesary since in all the other methods i am not using try catch because of the express-async errors package , but in this case if i use a token that has been created with a different secret the error thrown is not catched by the async-errors package
          return next(new CustomError('Unauthorized', 401))

        }
      }
    )(req, res, next);
  };

  return handler;
};

export default authenticate;
