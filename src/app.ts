import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { corsUrl, environment } from './config';
import routerV1 from './routes/v1';
import logger from './tools/logger';
import { ErrorBase, InternalError, NotFoundError } from './core/ErrorBase';
import './data/database'; //initialize database

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

app.use('/v1', routerV1);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorBase) {
        ErrorBase.handle(err, res);
    } else {
        if (environment === 'development') {
            logger.error(err);
            return res.status(500).send(err.message);
        }
        ErrorBase.handle(new InternalError(), res);
    }
});

export default app;
