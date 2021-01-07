// file deepcode ignore no-any: any needed
import { BasicService } from '@flexiblepersistence/backnextapi';
import { PersistenceInput, PersistencePromise } from 'flexiblepersistence';
import axios from 'axios';

export default class SessionService extends BasicService {
  delete(input: PersistenceInput<any>): Promise<PersistencePromise<undefined>> {
    return new Promise(async (resolve, reject) => {
      const host = process.env.AUTH_HOST;
      try {
        await axios.delete(host + '/signOut', input.item);
        resolve({
          receivedItem: undefined,
          result: undefined,
          selectedItem: input.selectedItem,
          sentItem: input.item,
        });
      } catch (error) {
        error.name = 'Unauthorized';
        reject(error);
      }
    });
  }
}
