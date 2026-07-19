import { Config } from './config/index.ts';
import { app } from './app.ts';
import logger from './config/logger.ts';

const startServer = () => {
    try {
        const port = Config.PORT;

        app.listen(port, () => {
            logger.info(`Server is running on port ${port}`);
        });
    } catch (error) {
        logger.error('Error starting the server:', error);
    }
};

startServer();
