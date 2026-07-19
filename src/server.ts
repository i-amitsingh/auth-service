import { Config } from './config/index.ts';
import { app } from './app.ts';

const startServer = () => {
    try {
        const port = Config.PORT;

        app.listen(port, () => {
            // eslint-disable-next-line no-console
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error starting the server:', error);
    }
};

startServer();
