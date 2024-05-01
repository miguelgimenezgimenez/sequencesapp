/* eslint-disable @typescript-eslint/no-unused-vars */
import { AssertionError } from 'assert';
import { ErrorRequestHandler } from 'express';
import CustomError from '../utils/errors/CustomError';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import Logger from '../lib/Logger';
import DI_TYPES from '../di/DITypes';
import DIContainer from '../di/diContainer';

const types = {
    SIMPLE: 'SIMPLE',
    ZOD_FLATTENED: 'ZOD_FLATTENED',
    DB_OPERATION: 'DB_OPERATION',
    UNHANDLED_ERROR: 'UNHANDLED_ERROR',
    SERVER_ERROR: 'SERVER_ERROR',
};
const errorHandler: ErrorRequestHandler = async (error, req, res, next) => {
    // Here we could log the error in a specific logger or send the error to a monitoring service depending wheter we are in production or development
    const logger = DIContainer.get<Logger>(DI_TYPES.Logger)
    logger.error(error.message);

    // Custom error

    if (error instanceof CustomError) {
        return res.status(error.status).send({
            ok: false,
            _type: types.SIMPLE,
            message: error.message,
        });
    }

    if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).send(validationError)
    }


    // Assertion error
    if (error instanceof AssertionError) {
        return res.status(500).json({
            _type: types.SERVER_ERROR,
            expected: error.expected,
            actual: error.actual,
            message: error.message,
            error: JSON.stringify(error),
        });
    }

    // Mongo error

    if (error.name === 'MongoServerError') {

        if (error.code === 11000) {
            return res.status(409).send({
                ok: false,
                _type: types.DB_OPERATION,
                message: `${Object.values(error.keyValue)} already exists`,
                error: JSON.stringify(error),
            });
        }
        return res.status(500).send({
            ok: false,
            _type: types.DB_OPERATION,
            message: error.message,
            error: JSON.stringify(error),
        });
    }

    // Other Errors

    return res.status(500).send({
        ok: false,
        _type: types.UNHANDLED_ERROR,
        message: error.message,
        error: JSON.stringify(error),
    });
};

export default errorHandler;
