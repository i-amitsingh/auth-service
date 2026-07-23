import { Config } from './config/index.ts';
import { AppDataSource } from './config/data-source.ts';
import app from './app.ts';
import logger from './config/logger.ts';

const startServer = async () => {
    try {
        const port = Config.PORT;

        await AppDataSource.initialize();
        logger.info('Database connected successfully');

        app.listen(port, () => {
            logger.info(`Server is running on port ${port}`);
        });
    } catch (error) {
        logger.error('Error starting the server:', error);
        process.exit(1);
    }
};

void startServer();
