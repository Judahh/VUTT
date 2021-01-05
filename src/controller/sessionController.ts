import {
  BaseControllerRead,
  BaseControllerStore,
  Mixin,
} from '@flexiblepersistence/backnextapi';
export default class SessionController extends Mixin(
  BaseControllerStore,
  BaseControllerRead
) {
  async authentication(req, _res, fn) {
    if (req.headers.authorization) {
      req.authorization = req.headers.authorization.replace('Bearer ', '');
      const service = this.getClassName().replace('Controller', 'Service');
      try {
        const auth = await this.journaly?.publish(
          service + '.authentication',
          req.authorization
        );
        req.permissions = auth.permissions;
        await fn(auth);
      } catch (error) {
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
    if (req.event && req.permissions) {
      const service = this.getClassName().replace('Controller', 'Service');
      try {
        const permission = await this.journaly?.publish(
          service + '.permission',
          req.event,
          req.permissions
        );
        fn(permission);
      } catch (error) {
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
