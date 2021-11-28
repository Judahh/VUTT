import { IServiceSimple } from '@flexiblepersistence/service';

export default interface ToolServiceSimpleModel extends IServiceSimple {
  title: string;
  link?: string;
  description?: string;
  tags?: string[];
}
