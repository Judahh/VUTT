import Index from '../../../../routes/index';
const signIn = Index.getController()?.signIn;
export default signIn?.mainRequestHandler.bind(signIn);
