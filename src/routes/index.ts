import { RouterSingleton } from '@backapirest/express';
import { IRouter } from 'backapi';
import Cors from 'cors';
import Helmet from 'helmet';
import Limit from 'express-rate-limit';
import { Mauth } from '@midware/mauth';
import { default as limitConfig } from '../config/limit.json';
import ToolRouter from './toolRouter';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
});

// Initializing the limit middleware
const limit = Limit({
  ...limitConfig,
  keyGenerator: function (req) {
    return req.headers['x-real-ip'];
  },
});

export default class Index extends RouterSingleton {
  getNames(array) {
    return array.map((value) => {
      return value.name;
    });
  }
  createRoutes(initDefault?: IRouter): void {
    if (initDefault) {
      const mauth = new Mauth();
      const routes = this.getRoutes();
      if (
        !initDefault.middlewares ||
        this.getNames(initDefault.middlewares).includes(cors.name)
      )
        initDefault.middlewares = [];
      initDefault.middlewares.push(cors);
      initDefault.middlewares.push(Helmet());
      initDefault.middlewares.push(limit);

      initDefault.middlewares.push(
        mauth.authentication.bind(mauth),
        mauth.permission.bind(mauth)
      );

      ToolRouter(routes, initDefault);
    } else {
      throw new Error('Must init Init Default');
    }
  }
}
