// file deepcode ignore no-any: any needed
import { BasicService } from '@backapirest/next';
import { PersistenceInput, PersistencePromise } from 'flexiblepersistence';
import axios from 'axios';

export default class SignUpService extends BasicService {
  create(
    input: PersistenceInput<any>
  ): Promise<PersistencePromise<{ token?: string }>> {
    return new Promise(async (resolve, reject) => {
      const host = process.env.AUTH_HOST;
      input.item.permissions = {};
      if (process.env.AUTH_IDENTIFICATION)
        input.item.permissions[process.env.AUTH_IDENTIFICATION] = {
          all: ['all'],
        };

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
        if (error.response && error.response.data) {
          const newError = new Error(error.response.data.error);
          newError.name = 'Unauthorized';
          reject(newError);
        } else {
          reject(error);
        }
      }
    });
  }
}
