import { RouterSingleton } from '@backapisocket/io';
import { IRouter } from 'backapi';
import Cors from 'cors';
import Helmet from 'helmet';
import Limit from 'express-rate-limit';
import { Mauth } from '@midware/mauth';
import { default as limitConfig } from '../config/limit.json';
import ToolRouter from './toolRouter';
import { Server, Socket } from 'socket.io';

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
  createRoutes(server: Server, socket: Socket, initDefault?: IRouter): void {
    if (initDefault) {
      const mauth = new Mauth();
      if (!initDefault.middlewares || initDefault.middlewares.length > 0)
        initDefault.middlewares = [];
      initDefault.middlewares.push(cors);
      initDefault.middlewares.push(Helmet());
      initDefault.middlewares.push(limit);

      initDefault.middlewares.push(
        mauth.authentication.bind(mauth),
        mauth.permission.bind(mauth)
      );

      ToolRouter(server, socket, initDefault);
    } else {
      throw new Error('Must init Init Default');
    }
  }
}
