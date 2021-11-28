import { request, RouterSingleton } from '@backapirest/next';
import dbHandler from '../../../../dBHandler';
import Index from '../../../../routes';
export default (req: Request, res: Response) => {
  return request(
    req,
    res,
    Index as unknown as RouterSingleton,
    dbHandler,
    'tool'
  );
};
