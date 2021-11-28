import { request, RouterSingleton } from '@backapirest/next';
import dbHandler from '../../../../dBHandler';
import Index from '../../../../routes';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (req: Request, res: Response) => {
  return request(
    req,
    res,
    Index as unknown as RouterSingleton,
    dbHandler,
    'tool'
  );
};
