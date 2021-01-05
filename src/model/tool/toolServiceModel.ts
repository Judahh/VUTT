import { ServiceModel } from '@flexiblepersistence/service';
import ToolServiceSimpleModel from './toolServiceSimpleModel';

export default interface ToolServiceModel extends ServiceModel {
  title: string;
  link?: string;
  description?: string;
  tags?: [string];
}
