import { BasicService } from '@flexiblepersistence/backnextapi';
import ToolServiceSimpleModel from '../model/tool/toolServiceSimpleModel';
import {
  PersistencePromise,
  PersistenceInputCreate,
  PersistenceInputRead,
  PersistenceInputUpdate,
  PersistenceInputDelete,
  PersistenceInput,
} from 'flexiblepersistence';
import ToolServiceModel from '../model/tool/toolServiceModel';

export default class ToolService extends BasicService {
  formatTags(input: PersistenceInput<ToolServiceSimpleModel>) {
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

  private formatContains(input: PersistenceInput<ToolServiceSimpleModel>) {
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

  private formatInput(input: PersistenceInput<ToolServiceSimpleModel>) {
    this.formatTags(input);
    this.formatContains(input);
  }
  private formatMongoReturnedItem(deleted) {
    if (deleted.receivedItem) deleted.receivedItem = [];
  }
  async create(
    input: PersistenceInputCreate<ToolServiceSimpleModel>
  ): Promise<PersistencePromise<ToolServiceModel>> {
    return super.create(input);
  }
  async read(
    input: PersistenceInputRead
  ): Promise<PersistencePromise<ToolServiceModel>> {
    this.formatInput(input);
    return super.read(input);
  }
  async update(
    input: PersistenceInputUpdate<ToolServiceSimpleModel>
  ): Promise<PersistencePromise<ToolServiceModel>> {
    this.formatInput(input);
    input.options = {
      returnOriginal: false,
    };
    return super.update(input);
  }
  async delete(
    input: PersistenceInputDelete
  ): Promise<PersistencePromise<ToolServiceModel>> {
    this.formatInput(input);
    const deleted = await super.delete(input);
    this.formatMongoReturnedItem(deleted);
    return deleted;
  }
}
