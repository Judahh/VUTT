// file deepcode ignore no-any: any needed
import { BasicService } from '@flexiblepersistence/backnextapi';
import jsonwebtoken from 'jsonwebtoken';

export default class JsonWebTokenService extends BasicService {
  async verify(token): Promise<unknown> {
    return new Promise(async (resolve, reject) => {
      try {
        const key = await this.journaly?.publish('KeyService.key');
        jsonwebtoken.verify(token, key, (error, data) =>
          error ? reject(error) : resolve(data)
        );

        //! TODO: check permissions
      } catch (error) {
        reject(error);
      }
    });
  }
}
