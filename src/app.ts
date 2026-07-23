import express from 'express';
import logger from './config/logger.ts';
import { HttpError } from 'http-errors';
import authRoutes from './routes/auth.ts';
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/auth', authRoutes);

// global error handler
app.use(
    (
        err: HttpError,
        req: express.Request,
        res: express.Response,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next: express.NextFunction,
    ) => {
        {
            logger.error(err.message);
            const statusCode = err.statusCode || 500;
            res.status(statusCode).json({
                errors: [
                    {
                        type: err.name,
                        message: err.message,
                        path: '',
                        location: '',
                    },
                ],
            });
        }
    },
);

export default app;
