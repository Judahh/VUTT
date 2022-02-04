import { IDatabaseHandler } from 'backapi';
import { Server, Socket } from 'socket.io';
import ToolController from '../controller/toolController';

export default function ToolRouter(
  _server: Server,
  socket: Socket,
  initDefault: IDatabaseHandler
): void {
  const toolController = new ToolController(initDefault);

  console.log('ToolRouter');

  //toolController.connect({}, socket, server);

  socket.on('tool.create', (data) => {
    console.log('tool.create');

    toolController.create.bind(toolController)(data, socket);
  });
  socket.on('tool.read', (data) => {
    toolController.read.bind(toolController)(data, socket);
  });
  socket.on('tool.update', (data) => {
    toolController.update.bind(toolController)(data, socket);
  });
  socket.on('tool.delete', (data) => {
    toolController.delete.bind(toolController)(data, socket);
  });
}
