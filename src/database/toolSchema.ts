import { BaseSchemaDefault } from 'flexiblepersistence';
import { Schema } from 'mongoose';

export default class ToolSchema extends BaseSchemaDefault {
  generateName(): void {
    this.setName('Tool');
  }
  protected attributes = {
    // Model attributes are defined here
    id: {
      type: Schema.Types.ObjectId,
      unique: true,
      index: true,
    },
    title: {
      type: Schema.Types.String,
      required: true,
    },
    link: {
      type: Schema.Types.String,
    },
    description: {
      type: Schema.Types.String,
    },
    tags: [Schema.Types.String],
  };

  protected options = { strict: false, id: true, versionKey: false };
}
