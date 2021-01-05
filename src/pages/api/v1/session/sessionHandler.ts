import Index from '../../../../routes/index';
const session = Index.getController()?.session;
export default session?.handlerRequest.bind(session);
