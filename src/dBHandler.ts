/* eslint-disable @typescript-eslint/ban-ts-comment */
// file deepcode ignore object-literal-shorthand: argh
// file deepcode ignore no-any: any needed
import { Handler, MongoDB, PersistenceInfo } from 'flexiblepersistence';
import {
  DatabaseHandler,
  Journaly,
  SubjectObserver,
} from '@flexiblepersistence/backnextapi';
import { ServiceHandler } from '@flexiblepersistence/service';
import ToolService from './service/toolService';
import { eventInfo, readInfo } from './config/databaseInfos';
import SignInService from './service/signInService';
import SignUpService from './service/signUpService';
import SignOutService from './service/signOutService';
import AuthenticationService from './service/authenticationService';
import JsonWebTokenService from './service/jsonWebTokenService';
import ToolSchema from './database/toolSchema';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const journaly = Journaly.newJournaly() as SubjectObserver<any>;
const readDatabase = new PersistenceInfo(readInfo, journaly);
const eventDatabase = new PersistenceInfo(eventInfo, journaly);

const database = new MongoDB(readDatabase, { Tool: new ToolSchema() });

const read = new ServiceHandler(
  readDatabase,
  {
    signIn: new SignInService(),
    signUp: new SignUpService(),
    signOut: new SignOutService(),
    authentication: new AuthenticationService(),
    jsonWebToken: new JsonWebTokenService(),
    tool: new ToolService(),
  },
  database
);
const write = new MongoDB(eventDatabase);
const handler = new Handler(write, read);
export default DatabaseHandler.getInstance({
  handler: handler,
  journaly: journaly,
}) as DatabaseHandler;
