import ToolController from '../controller/toolController';
import SessionController from '../controller/sessionController';
import dBHandler from '../dBHandler';
import {
  RouterSingleton,
  RouterInitializer,
} from '@flexiblepersistence/backnextapi';
import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
});

class Index extends RouterSingleton {
  getNames(array) {
    return array.map((value) => {
      return value.name;
    });
  }
  createRoutes(initDefault?: RouterInitializer): void {
    if (initDefault) {
      if (
        !initDefault.middlewares ||
        this.getNames(initDefault.middlewares).includes(cors.name)
      )
        initDefault.middlewares = [];
      initDefault.middlewares.push(cors);

      const session = new SessionController(initDefault);

      // initDefault.middlewares.push(session.authentication.bind(session));
      // initDefault.middlewares.push(session.permission.bind(session));

      const tool = new ToolController(initDefault);

      this.controller = {
        session,
        tool,
      };
    } else {
      throw new Error('Must init Init Default');
    }
  }
}

Index.getInstance().createRoutes(dBHandler.getInit());

export default Index.getInstance();
