/* eslint-disable-next-line */
import * as express from 'express';
import { IUser } from 'src/models/user';

declare global {
    namespace Express {
        export interface User extends IUser { }
        interface Request {
            userId?: string;
            user: IUser;
        }
    }
}
