// file deepcode ignore no-any: any needed
import { BasicService } from '@flexiblepersistence/backnextapi';
import { Operation } from 'flexiblepersistence';

export default class AuthenticationService extends BasicService {
  authentication(token): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const permission = await this.journaly?.publish(
          'JsonWebTokenService.verify',
          token
        );
        resolve(permission);
      } catch (error) {
        reject(error);
      }
    });
  }

  permission(event, permissions): Promise<any> {
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
}
