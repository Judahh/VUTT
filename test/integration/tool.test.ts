// file deepcode ignore no-any: any needed
import dBHandler, { write, read } from '../../src/dBHandler';
import ToolController from '../../src/controller/toolController';
import { Request, Response } from 'express';
import { mockResponse } from './response.mock';
import { Event, Operation } from 'flexiblepersistence';

test('store a tool and check it', async () => {
  const handler = dBHandler.getHandler();
  await handler?.getWrite()?.clear();
  const tool = new ToolController(dBHandler.getInit());
  try {
    const storeTool = {
      title: 'Notion',
      link: 'https://notion.so',
      description:
        'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
      tags: [
        'organization',
        'planning',
        'collaboration',
        'writing',
        'calendar',
      ],
    };
    const toolStored = await tool.create(
      {
        body: storeTool,
      } as unknown as Request,
      mockResponse as unknown as Response
    );

    if (toolStored && toolStored['received'] && toolStored['received'].tags)
      toolStored['received'].tags = toolStored['received'].tags.toObject();

    expect(toolStored['received']).toStrictEqual({
      id: toolStored['received'].id,
      ...storeTool,
    });
  } catch (error) {
    console.error(error);
    await handler?.getWrite()?.clear();
    await handler.addEvent(
      new Event({ operation: Operation.delete, name: 'Tool', single: false })
    );
    expect(error).toBe(null);
    write.close();
    read.close();
  }
  await handler?.getWrite()?.clear();
  await handler.addEvent(
    new Event({ operation: Operation.delete, name: 'Tool', single: false })
  );
  write.close();
  read.close();
});
