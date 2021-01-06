import { BaseControllerDefault } from '@flexiblepersistence/backnextapi';
export default class Authentication extends BaseControllerDefault {
  async authentication(req, _res, fn) {
    if (req.headers.authorization) {
      req.authorization = req.headers.authorization.replace('Bearer ', '');
      // console.log(req.authorization);
      const service = this.getClassName() + 'Service';
      // console.log(service);
      // console.log(req.authorization);
      try {
        const auth = await this.journaly?.publish(
          service + '.authentication',
          req.authorization
        );
        // console.log('authentication', auth);
        req.permissions = auth.permissions;
        await fn(auth);
      } catch (error) {
        // console.log('Error NAME:' + error.name);
        error.name = 'Unauthorized';
        await fn(error);
      }
    } else {
      const error = new Error('Missing Credentials.');
      error.name = 'Unauthorized';
      await fn(error);
    }
  }

  async permission(req, _res, fn) {
    // console.log('permission:', req.permissions);
    // console.log('event:', req.event);
    if (req.event && req.permissions) {
      const service = this.getClassName() + 'Service';
      // console.log(service);
      try {
        const permission = await this.journaly?.publish(
          service + '.permission',
          req.event,
          req.permissions
        );
        // console.log('permission', permission);
        fn(permission);
      } catch (error) {
        // console.log('Error NAME:' + error.name);
        error.name = 'Unauthorized';
        await fn(error);
      }
    } else {
      const error = new Error('Missing Permissions.');
      error.name = 'Unauthorized';
      await fn(error);
    }
  }
}
