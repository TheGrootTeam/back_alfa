import LoginController from '../LoginController';

describe('LoginController', () => {
  let loginController: LoginController;

  beforeEach(() => {
    loginController = new LoginController();
  });

  test('should create an instance of LoginController', () => {
    expect(loginController).toBeInstanceOf(LoginController);
  });

});
