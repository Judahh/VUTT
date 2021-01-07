// file deepcode ignore no-any: any needed
import { BasicService } from '@flexiblepersistence/backnextapi';
import { PersistenceInput, PersistencePromise } from 'flexiblepersistence';
import axios from 'axios';

export default class SignInService extends BasicService {
  create(input: PersistenceInput<any>): Promise<PersistencePromise<any>> {
    return new Promise(async (resolve, reject) => {
      const host = process.env.AUTH_HOST;
      try {
        const received = await axios.post(host + '/signIn', input.item);
        resolve({
          receivedItem: received.data,
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
