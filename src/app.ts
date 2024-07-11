import express, { Express } from 'express';
import morgan from 'morgan';
import { requestLogger } from './middlewares/requestLogger';
import errorHandler from './middlewares/errorHandler';
import router from './routers';

class Application {
  public app: Express;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(requestLogger);
  }

  private initializeRoutes() {
    this.app.get('/', (req, res) => {
      res.json({ message: 'Hello World!' });
    });
    this.app.use('/api', router);
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler);
  }
}

export default new Application().app;
