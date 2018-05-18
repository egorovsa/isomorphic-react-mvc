import * as express from 'express';
import * as path from 'path';
import { RenderServerSide } from './server-middles/main';
import { renderToString } from 'react-dom/server';
import cookieParser = require('cookie-parser');
import CONFIG from '../config/config';

const production = !process.env.DEVELOP;
const app = express();
const PORT = process.env.PORT || CONFIG.PRODUCTION_PORT;

if (CONFIG.GZIP_BY_EXPRESS && !production) {
    const compression = require('compression');
    app.use(compression());
}

if (!production) {
    console.log('SERVER DEVELOPMENT MODE');
    global['DEVELOP'] = true;
    require('source-map-support').install();
}

app.use(cookieParser());
app.use(express.static(path.join(__dirname, './../') + '/webroot'));

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    RenderServerSide.checkUrlWithDots(req, res, next);
});

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    RenderServerSide.userAgentHandler(req, res, next);
});

app.use((req, res) => {
    RenderServerSide.render(req, res);
});

app.listen(PORT, () => console.log(`Server listening on: ${PORT}`));

if (!production) {
    process.on('unhandledRejection', (reason, p) => {
        console.log('Unhandled Rejection at: PROMISE \n\n', p, '\n\n\n REASON: \n\n', reason);
    });

    process.on('warning', (reason, p) => {
        console.log('Warning: PROMISE \n\n', p, '\n\n\n REASON: \n\n', reason);
    });
}