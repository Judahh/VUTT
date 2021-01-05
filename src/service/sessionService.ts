// file deepcode ignore no-any: any needed
import { BasicService } from '@flexiblepersistence/backnextapi';
import {
  Operation,
  PersistenceInput,
  PersistencePromise,
} from 'flexiblepersistence';
import jsonwebtoken from 'jsonwebtoken';

export default class SessionService extends BasicService {
  public key() {
    // get from auth if is more than 15m
    return (
      process.env.JWT_PUBLIC_KEY ||
      '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3POpb9/1PwBK9A3vBfXX\nTJuGhTMy8CreeFXEM19/WB6bLqhIXE7IzH40KNnfWnQn1twMshViJBN9eHAiYErn\nF5dJrzjWtIp9xrFhmquYvz/2RyeVflWXH/ZmfO1v15nF7tKjN3+WTM4rAY9wGssl\nGahvs6ET0rp2PG0PLJXXEvYNxHp1OpP21xrWepb3RXCxlCqARq//UNENgFyazpsx\n9Q/V15xvlmUT74mYOGMMEhy/Xw71SEMr/rOElXj2cGZ65fgeBl+vi7Fj/0Z7jk23\nKa4iuaXxElys8cieok77KJrhwFoRae4cJgjY86SfYgipc5PwepOtu1S5k3NRtIEV\nAQIDAQAB\n-----END PUBLIC KEY-----\n'
    );
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
      const identification = input.item;
      const subScheme = 'Person';
      const method = 'read';
      if (!identification) {
        const error = new Error('Missing Id.');
        reject(error);
        return;
      }

      const tIdentification = JSON.parse(JSON.stringify(identification));
      delete tIdentification.password;
      delete tIdentification.id;

      const newSubInput = {
        single: true,
        scheme: subScheme,
        selectedItem: {
          identifications: { $elemMatch: tIdentification },
        },
      };

      const person: any = await this.journaly?.publish(
        subScheme + 'Service.' + method,
        newSubInput
      );

      if (!person.receivedItem) {
        const error = new Error('Person was not found.');
        error.name = 'NotFound';
        reject(error);
        return;
      }

      // const personIdentifications = JSON.parse(
      //   JSON.stringify(person.receivedItem.identifications)
      // );

      // const identifications = personIdentifications.filter(
      //   (element) => element.type === identification.type
      // );

      // try {
      //   await this[this.verify[identification.type]](
      //     identification,
      //     identifications,
      //     input.receivedEvent ? input.receivedEvent['headers'] : undefined
      //   );
      // } catch (error) {
      //   reject(error);
      //   return;
      // }

      const cleanPerson = JSON.parse(JSON.stringify(person.receivedItem));
      delete cleanPerson.instances;
      delete cleanPerson.identifications;

      resolve({
        receivedItem: {
          // token: this.sign(cleanPerson),
        },
        result: undefined,
        selectedItem: input.selectedItem,
        sentItem: input.item,
      });
      return;
    });
  }
}
