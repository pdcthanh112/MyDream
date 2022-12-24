import { NextFunction, Request, Response, Router } from 'express';
import IndexController from '@controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';

class IndexRoute implements Routes {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
      console.log('CCCCCCCCCC');
      try {
        res.sendStatus(200);
      } catch (error) {
        next(error);
      }
    });
    // this.router.get(`${this.path}`, this.indexController.index);
  }
}

export default IndexRoute;
