import { ServiceSimpleModel } from '@flexiblepersistence/service';

export default interface ToolServiceSimpleModel extends ServiceSimpleModel {
  title: string;
  link?: string;
  description?: string;
  tags?: string[];
}
