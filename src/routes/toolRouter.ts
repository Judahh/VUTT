import { IDatabaseHandler } from 'backapi';
import { Router } from 'express';
import ToolController from '../controller/toolController';

export default function ToolRouter(
  routes: Router,
  initDefault: IDatabaseHandler
): void {
  const toolController = new ToolController(initDefault);

  routes.get('/api/v1/tools/:id', toolController.index.bind(toolController));
  routes.post('/api/v1/tools', toolController.create.bind(toolController));
  routes.get('/api/v1/tools', toolController.read.bind(toolController));
  routes.put('/api/v1/tools', toolController.update.bind(toolController));
  routes.patch('/api/v1/tools', toolController.update.bind(toolController));
  routes.delete('/api/v1/tools', toolController.delete.bind(toolController));
}
