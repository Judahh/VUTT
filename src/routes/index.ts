import { RouterSingleton } from '@backapirest/express';
import { IRouter } from 'backapi';
import cors from 'cors';
import Helmet from 'helmet';
import Limit from 'express-rate-limit';
import { Mauth } from '@midware/mauth';
import { limitConfig } from '../config/limitConfig';
import ToolRouter from './toolRouter';

// Initializing the cors middleware
const limit = Limit(limitConfig);

const corsEnabled =
  process.env.CORS_ENABLED?.toLocaleLowerCase() === 'true' ||
  process.env.ALLOWED_ORIGIN === '*';

const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: process.env.ALLOWED_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue:
    process.env.ALLOWED_PREFLIGHT_CONTINUE?.toLocaleLowerCase() === 'true' ||
    false,
  optionsSuccessStatus: process.env.ALLOWED_OPTIONS_SUCCESS_STATUS
    ? +process.env.ALLOWED_OPTIONS_SUCCESS_STATUS
    : 204,
  exposedHeaders: process.env.ALLOWED_EXPOSE_HEADERS
    ? process.env.ALLOWED_EXPOSE_HEADERS
    : 'Access-Control-Allow-Headers, Origin, Accept, ' +
      'X-Requested-With, Content-Type, Access-Control-Request-Method, ' +
      'Access-Control-Request-Headers,  Authorization, authorization, pages, ' +
      'page, pageSize, numberOfPages, pagesize, numberofpages, pageNumber, ' +
      'pagenumber, type, token, filter, single, sort, sortBy, sortByDesc, ' +
      'sortByDescending, sortByAsc, sortByAscending, sortByDescending, ' +
      'Access-Control-Allow-Origin',
};

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
      if (!initDefault.middlewares || initDefault.middlewares.length > 0)
        initDefault.middlewares = [];
      if (corsEnabled) initDefault.middlewares.push(cors(corsOptions));
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
