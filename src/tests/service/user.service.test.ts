// Import dependencies
import UsersRepository from "../../repository/user.repository";
import UsersService from "../../service/user.service";
import useTimezone from "../../utils/timezone.util";

jest.mock('../repository/user.repository');
jest.mock('../utils/timezone.util');

const mockUsersRepository = {
  all: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn()
};
const mockUseTimezone = {
  getTimezone: jest.fn()
};

UsersRepository.mockReturnValue(mockUsersRepository);
useTimezone.mockReturnValue(mockUseTimezone);

describe('UsersService', () => {
  let service: any;

  beforeEach(() => {
    jest.clearAllMocks();
    service = UsersService();
  });

  describe('findAllUsers', () => {
    it('should return all users', async () => {
      const users = [{ id: 1, firstName: 'John' }];
      mockUsersRepository.all.mockResolvedValue(users);

      const result = await service.findAllUsers();

      expect(mockUsersRepository.all).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findUserById', () => {
    it('should return a user by ID', async () => {
      const user = { id: 1, firstName: 'John' };
      mockUsersRepository.findById.mockResolvedValue(user);

      const result = await service.findUserById('1');

      expect(mockUsersRepository.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(user);
    });
  });

  describe('createUser', () => {
    it('should create a new user with the correct timezone', async () => {
      const user = {
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        birthdayDate: '2024-12-21',
        location: 'New York',
        timezone: ''
      };
      mockUseTimezone.getTimezone.mockResolvedValue('America/New_York');

      await service.createUser(user);

      expect(mockUseTimezone.getTimezone).toHaveBeenCalledWith('New York');
      expect(mockUsersRepository.save).toHaveBeenCalledWith({
        ...user,
        birthdayDate: new Date('2024-12-21'),
        timezone: 'America/New_York'
      });
    });
  });

  describe('updateUser', () => {
    it('should update an existing user with the correct timezone', async () => {
      const user = {
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        birthdayDate: '2024-12-21',
        location: 'New York',
        timezone: ''
      };
      mockUseTimezone.getTimezone.mockResolvedValue('America/New_York');

      await service.updateUser('1', user);

      expect(mockUseTimezone.getTimezone).toHaveBeenCalledWith('New York');
      expect(mockUsersRepository.update).toHaveBeenCalledWith('1', {
        ...user,
        birthdayDate: new Date('2024-12-21'),
        timezone: 'America/New_York'
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by ID', async () => {
      await service.deleteUser('1');

      expect(mockUsersRepository.destroy).toHaveBeenCalledWith('1');
    });
  });
});
