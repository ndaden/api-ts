import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { corsUrl } from './config';
import routerV1 from './routes/v1';
import logger from './tools/logger';

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

app.use('/v1', routerV1);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(error.message);
    return res.status(500).send(error.message);
});

export default app;
