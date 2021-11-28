/* eslint-disable @typescript-eslint/ban-ts-comment */
// file deepcode ignore object-literal-shorthand: argh
// file deepcode ignore no-any: any needed
import {
  Handler,
  MongoPersistence,
  PersistenceInfo,
} from 'flexiblepersistence';
import { DatabaseHandler } from 'backapi';
import { Journaly, SenderReceiver } from 'journaly';
import { ServiceHandler } from '@flexiblepersistence/service';
import ToolService from './service/toolService';
import { eventInfo, readInfo } from './config/databaseInfos';
import ToolSchema from './database/toolSchema';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const journaly = Journaly.newJournaly() as SenderReceiver<any>;

const readDatabase = new PersistenceInfo(readInfo, journaly);
const eventDatabase = new PersistenceInfo(eventInfo, journaly);

const database = new MongoPersistence(readDatabase, { Tool: new ToolSchema() });

const read = new ServiceHandler(
  readDatabase,
  {
    tool: new ToolService(),
  },
  database
);
const write = new MongoPersistence(eventDatabase);
const handler = new Handler(write, read);
export default DatabaseHandler.getInstance({
  handler: handler,
  journaly: journaly,
}) as DatabaseHandler;
