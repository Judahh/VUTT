// file deepcode ignore no-any: any needed
import { BasicService } from '@flexiblepersistence/backnextapi';
import {
  Operation,
  PersistenceInput,
  PersistencePromise,
} from 'flexiblepersistence';
import jsonwebtoken from 'jsonwebtoken';
import { setTimeout } from 'timers';
import axios from 'axios';

export default class SessionService extends BasicService {
  private publicKey;
  private timerRunning;

  private async getKey() {
    const host = process.env.AUTH_HOST;
    const received = await axios.get(host + '/session');
    this.publicKey = received.data.key;
    return this.publicKey;
  }
  private clearKey() {
    this.timerRunning = false;
    this.getKey();
  }
  public async key() {
    if (this.publicKey) {
      if (!this.timerRunning) {
        setTimeout(this.clearKey.bind(this), 15 * 60 * 1000);
        this.timerRunning = true;
      }
      return this.publicKey;
    } else {
      return await this.getKey();
    }
  }

  public verifyToken(token): Promise<unknown> {
    return new Promise((resolve, reject) => {
      try {
        jsonwebtoken.verify(token, this.key(), (error, data) =>
          error ? reject(error) : resolve(data)
        );

        //! TODO: check permissions
      } catch (error) {
        reject(error);
      }
    });
  }

  public authentication(token): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const permission = await this.verifyToken(token);
        resolve(permission);
      } catch (error) {
        reject(error);
      }
    });
  }

  public permission(event, permissions): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const instanceName = process.env.INSTANCE || 'VUTT';
        const instance = permissions['all'] || permissions[instanceName];
        if (instance) {
          const service = instance['all'] || instance[event.name];
          if (service) {
            const operationName = Operation[event.operation];
            const operation =
              service.includes('all') || service.includes(operationName);
            if (operation) resolve(true);
          }
        }
        const error = new Error('Unauthorized');
        error.name = 'Unauthorized';
        reject(error);
      } catch (error) {
        reject(error);
      }
    });
  }

  create(
    input: PersistenceInput<any>
  ): Promise<PersistencePromise<{ token?: string }>> {
    // send to auth
    return new Promise(async (resolve, reject) => {
      const host = process.env.AUTH_HOST;
      try {
        const received = await axios.post(host + '/session', input.item);
        resolve({
          receivedItem: {
            token: received.data.token,
          },
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
