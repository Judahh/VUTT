import { ServiceModel } from '@flexiblepersistence/service';
export default interface ToolServiceModel extends ServiceModel {
  title: string;
  link?: string;
  description?: string;
  tags?: [string];
}
