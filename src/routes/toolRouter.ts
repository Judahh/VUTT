import { IDatabaseHandler } from 'backapi';
import { Server, Socket } from 'socket.io';
import ToolController from '../controller/toolController';

export default function ToolRouter(
  _server: Server,
  socket: Socket,
  initDefault: IDatabaseHandler
): void {
  const toolController = new ToolController(initDefault);

  socket.on('tool.create', (data) => {
    toolController.store.bind(toolController)(data, socket);
  });
  socket.on('tool.read', (data) => {
    toolController.show.bind(toolController)(data, socket);
  });
  socket.on('tool.update', (data) => {
    toolController.update.bind(toolController)(data, socket);
  });
  socket.on('tool.delete', (data) => {
    toolController.delete.bind(toolController)(data, socket);
  });
}
