// file deepcode ignore no-any: any needed
import { Event, Operation } from '@backapirest/next';
import dBHandler from '../../src/dBHandler';
import ToolController from '../../src/controller/toolController';
import { NextApiRequest as Request, NextApiResponse as Response } from 'next';
import { mockResponse } from './response.mock';

test('store a tool and check it', async (done) => {
  const handler = dBHandler.getHandler();
  await handler.getWrite().clear();
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
    const toolStored = await tool.store(
      ({
        body: storeTool,
      } as unknown) as Request,
      (mockResponse as unknown) as Response
    );

    if (toolStored && toolStored['received'] && toolStored['received'].tags)
      toolStored['received'].tags = toolStored['received'].tags.toObject();

    expect(toolStored['received']).toStrictEqual({
      id: toolStored['received'].id,
      ...storeTool,
    });
  } catch (error) {
    console.error(error);
    await handler.getWrite().clear();
    await handler.addEvent(
      new Event({ operation: Operation.delete, name: 'Tool', single: false })
    );
    expect(error).toBe(null);
    done();
  }
  await handler.getWrite().clear();
  await handler.addEvent(
    new Event({ operation: Operation.delete, name: 'Tool', single: false })
  );
  done();
});
