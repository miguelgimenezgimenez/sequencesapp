import UserService from '../UserService';
import CustomError from '../../../utils/errors/CustomError';

import { comparePassword, encryptPassword } from '../user.helpers';

// Mocking helper functions
jest.mock('../user.helpers', () => ({
  comparePassword: jest.fn(),
  encryptPassword: jest.fn(),
}));

const mockDataService = {
  user: {
    findOne: jest.fn(),
    createOne: jest.fn(),
  }
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(mockDataService as any);
  });

  describe('authenticateUser', () => {
    it('should authenticate a user', async () => {
      const email = 'john.doe@example.com';
      const plaintextPassword = 'plaintextPassword';
      const encryptedPassword = await encryptPassword(plaintextPassword);
      const mockUser = { email, password: encryptedPassword };

      mockDataService.user.findOne.mockResolvedValue(mockUser);
      (comparePassword as jest.Mock).mockResolvedValue(true);

      const result = await userService.authenticateUser(email, plaintextPassword);
      expect(result).toEqual(mockUser);
    });
    it('should throw an error when user doesnt exits', async () => {
      const email = 'john.doe@example.com';
      const plaintextPassword = 'plaintextPassword';
      mockDataService.user.findOne.mockResolvedValue(null);

      await expect(userService.authenticateUser(email, plaintextPassword)).rejects.toThrow(new CustomError('Invalid Credentials', 401));

    });

    it('should throw an error if credentials are invalid', async () => {
      const email = 'john.doe@example.com';
      const plaintextPassword = 'plaintextPassword';

      mockDataService.user.findOne.mockResolvedValue(null);
      (comparePassword as jest.Mock).mockResolvedValue(false);

      await expect(userService.authenticateUser(email, plaintextPassword)).rejects.toThrow(new CustomError('Invalid Credentials', 401));
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const email = 'john.doe@example.com';
      const plaintextPassword = 'plaintextPassword';
      const encryptedPassword = 'encryptedPassword';
      const mockUser = { email, password: encryptedPassword };

      (encryptPassword as jest.Mock).mockResolvedValue(encryptedPassword);
      mockDataService.user.createOne.mockResolvedValue(mockUser);

      const result = await userService.createUser(email, plaintextPassword);

      // Checking if encryptPassword is being called
      expect(encryptPassword).toHaveBeenCalledWith(plaintextPassword);

      expect(result).toEqual(mockUser);
    });
  });
});
