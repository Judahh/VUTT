import ToolController from '../controller/toolController';
import SignUpController from '../controller/signUpController';
import SignInController from '../controller/signInController';
import dBHandler from '../dBHandler';
import {
  RouterSingleton,
  RouterInitializer,
} from '@flexiblepersistence/backnextapi';
import Cors from 'cors';
// import Authentication from '../middleware/authentication';

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

      const signIn = new SignInController(initDefault);
      const signUp = new SignUpController(initDefault);
      // const authentication = new Authentication(initDefault);

      // initDefault.middlewares.push(
      //   authentication.authentication.bind(authentication)
      // );
      // initDefault.middlewares.push(
      //   authentication.permission.bind(authentication)
      // );

      const tool = new ToolController(initDefault);

      this.controller = {
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
