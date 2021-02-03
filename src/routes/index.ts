import ToolController from '../controller/toolController';
import SignUpController from '../controller/signUpController';
import SignInController from '../controller/signInController';
import dBHandler from '../dBHandler';
import { RouterSingleton, RouterInitializer } from '@backapirest/next';
import Cors from 'cors';
import Helmet from 'helmet';
import Limit from 'express-rate-limit';
import Authentication from '../middleware/authentication';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
});

// Initializing the limit middleware
const limit = Limit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
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
      initDefault.middlewares.push(Helmet());
      initDefault.middlewares.push(limit);

      const signIn = new SignInController(initDefault);
      const signUp = new SignUpController(initDefault);
      const authentication = new Authentication(initDefault);

      initDefault.middlewares.push(
        authentication.authentication.bind(authentication)
      );
      initDefault.middlewares.push(
        authentication.permission.bind(authentication)
      );

      const tool = new ToolController(initDefault);

      this.controller = {
        authentication,
        signIn,
        signUp,
        tool,
      };
    } else {
      throw new Error('Must init Init Default');
    }
  }
}

Index.getInstance().createRoutes(dBHandler.getInit());

export default Index.getInstance();
