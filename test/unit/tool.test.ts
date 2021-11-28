import { IInput } from 'flexiblepersistence';
import ToolServiceSimpleModel from '../../src/model/tool/toolServiceSimpleModel';
import ToolService from '../../src/service/toolService';

test('format sent tags and check it', async () => {
  const tool = new ToolService();
  try {
    const inputTool: IInput<ToolServiceSimpleModel> = {
      scheme: 'Tool',
      selectedItem: { tag: 'planning,organization' },
    };

    let expectedInputTool = JSON.parse(JSON.stringify(inputTool));
    delete expectedInputTool.selectedItem.tag;
    expectedInputTool = {
      ...expectedInputTool,
      selectedItem: { tags: { $all: ['planning', 'organization'] } },
    };

    tool.formatTags(inputTool);

    expect(inputTool).toStrictEqual(expectedInputTool);
  } catch (error) {
    console.error(error);
    expect(error).toBe(null);
  }
});
