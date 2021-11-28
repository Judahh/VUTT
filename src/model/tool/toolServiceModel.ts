import { IService } from '@flexiblepersistence/service';
export default interface ToolServiceModel extends IService {
  title: string;
  link?: string;
  description?: string;
  tags?: [string];
}
