import app from './app';
import { port } from './config';
import Logger from './tools/logger';

app.listen(port, () => Logger.info(`listening on port: ${port}.`)).on('error', (e) => Logger.error(e));
