// file deepcode ignore no-any: any needed
import { BasicService } from '@flexiblepersistence/backnextapi';
import { PersistenceInput, PersistencePromise } from 'flexiblepersistence';
import axios from 'axios';

export default class SignUpService extends BasicService {
  create(
    input: PersistenceInput<any>
  ): Promise<PersistencePromise<{ token?: string }>> {
    return new Promise(async (resolve, reject) => {
      const host = process.env.AUTH_HOST;
      try {
        const config = await this.journaly?.publish('KeyService.config');
        const received = await axios.post(host + '/signUp', input.item, config);
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
