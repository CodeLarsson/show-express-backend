import express, { Express } from 'express';
import apiRouter from './api/api.router';
import cors from 'cors';
import helmet from 'helmet';

class Server {
  private app: Express = express();
  private port: number;

  constructor(serverPort: number) {
    this.port = serverPort;
  }

  public startServer() {
    this.app.use(cors());
    this.app.use(helmet());

    this.app.use('/api', apiRouter);
    this.app.listen(this.port, () => {
      console.info(`Server is listening on port ${this.port}`);
    });
  }
}

new Server(3000).startServer();
