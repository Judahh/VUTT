import { BaseService } from '@flexiblepersistence/service';
import ToolServiceSimpleModel from '../model/tool/toolServiceSimpleModel';
import {
  IOutput,
  IInputCreate,
  IInputRead,
  IInputUpdate,
  IInputDelete,
  IInput,
} from 'flexiblepersistence';
import ToolServiceModel from '../model/tool/toolServiceModel';

export default class ToolService extends BaseService<
  ToolServiceSimpleModel,
  ToolServiceModel
> {
  formatTags(input: IInput<ToolServiceSimpleModel>) {
    if (input.selectedItem) {
      if (input.selectedItem['tag'] && !input.selectedItem.tags) {
        input.selectedItem.tags = input.selectedItem['tag'];
        delete input.selectedItem['tag'];
      }
      if (input.selectedItem.tags)
        input.selectedItem.tags = {
          $all: input.selectedItem.tags.split(','),
        };
    }
  }

  private formatContains(input: IInput<ToolServiceSimpleModel>) {
    if (input.selectedItem) {
      if (input.selectedItem['containsTitle'] && !input.selectedItem.title) {
        input.selectedItem.title = input.selectedItem['containsTitle'];
        delete input.selectedItem['containsTitle'];
        input.selectedItem.title = {
          $regex: input.selectedItem.title,
        };
      }

      if (input.selectedItem['containsLink'] && !input.selectedItem.link) {
        input.selectedItem.link = input.selectedItem['containsLink'];
        delete input.selectedItem['containsLink'];
        input.selectedItem.link = {
          $regex: input.selectedItem.link,
        };
      }

      if (
        input.selectedItem['containsDescription'] &&
        !input.selectedItem.description
      ) {
        input.selectedItem.description =
          input.selectedItem['containsDescription'];
        delete input.selectedItem['containsDescription'];
        input.selectedItem.description = {
          $regex: input.selectedItem.description,
        };
      }
    }
  }

  private formatInput(input: IInput<ToolServiceSimpleModel>) {
    this.formatTags(input);
    this.formatContains(input);
  }
  private formatMongoReturnedItem(deleted) {
    if (deleted.receivedItem) deleted.receivedItem = [];
  }
  async create(
    input: IInputCreate<ToolServiceSimpleModel>
  ): Promise<IOutput<ToolServiceSimpleModel, ToolServiceModel>> {
    return super.create(input);
  }
  async read(
    input: IInputRead
  ): Promise<IOutput<ToolServiceSimpleModel, ToolServiceModel>> {
    this.formatInput(input);
    return super.read(input);
  }
  async update(
    input: IInputUpdate<ToolServiceSimpleModel>
  ): Promise<IOutput<ToolServiceSimpleModel, ToolServiceModel>> {
    this.formatInput(input as IInput<ToolServiceSimpleModel>);
    input.options = {
      returnOriginal: false,
    };
    return super.update(input);
  }
  async delete(
    input: IInputDelete
  ): Promise<IOutput<ToolServiceSimpleModel, ToolServiceModel>> {
    this.formatInput(input);
    const deleted = await super.delete(input);
    this.formatMongoReturnedItem(deleted);
    return deleted;
  }
}
