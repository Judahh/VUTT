import Index from '../../../../routes/index';
const tool = Index.getController()?.tool;
export default tool?.mainRequestHandler.bind(tool);
