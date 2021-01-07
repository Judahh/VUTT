import Index from '../../../../routes/index';
const signUp = Index.getController()?.signUp;
export default signUp?.mainRequestHandler.bind(signUp);
