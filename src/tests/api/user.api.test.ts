// Import dependencies
import UsersController from "../../controller/users.controller";

// Mock UsersService
const mockUsersService = {
  findAllUsers: jest.fn(),
  findUserById: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn()
};

jest.mock('../services/UsersService', () => () => mockUsersService);

// Tests
describe('UsersController', () => {
  let controller: any;
  let request: any;
  let response: any;

  beforeEach(() => {
    controller = UsersController();
    request = { params: {}, body: {} };
    response = {
      status: jest.fn(() => response),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  describe('index', () => {
    it('should return all users', async () => {
      const users = [{ id: 1, name: 'John Doe' }];
      mockUsersService.findAllUsers.mockResolvedValue(users);

      await controller.index(request, response);

      expect(mockUsersService.findAllUsers).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        message: 'Users retrieved successfully',
        data: users
      });
    });
  });

  describe('show', () => {
    it('should return a user if found', async () => {
      const user = { id: 1, name: 'John Doe' };
      request.params.id = '1';
      mockUsersService.findUserById.mockResolvedValue(user);

      await controller.show(request, response);

      expect(mockUsersService.findUserById).toHaveBeenCalledWith('1');
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        message: 'User retrieved successfully',
        data: user
      });
    });

    it('should return 404 if user is not found', async () => {
      request.params.id = '1';
      mockUsersService.findUserById.mockResolvedValue(null);

      await controller.show(request, response);

      expect(mockUsersService.findUserById).toHaveBeenCalledWith('1');
      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({
        message: 'User not found'
      });
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user = { id: 1, name: 'John Doe' };
      request.body = { email: 'john@example.com', firstName: 'John', lastName: 'Doe' };
      mockUsersService.createUser.mockResolvedValue(user);

      await controller.create(request, response);

      expect(mockUsersService.createUser).toHaveBeenCalledWith(request.body);
      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith({
        message: 'User created successfully',
        data: user
      });
    });
  });

  describe('update', () => {
    it('should update a user if found', async () => {
      const user = { id: 1, name: 'John Doe' };
      request.params.id = '1';
      request.body = { firstName: 'Updated Name' };
      mockUsersService.findUserById.mockResolvedValue(user);

      await controller.update(request, response);

      expect(mockUsersService.findUserById).toHaveBeenCalledWith('1');
      expect(mockUsersService.updateUser).toHaveBeenCalledWith('1', request.body);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        message: 'User updated successfully',
        data: user
      });
    });

    it('should return 404 if user is not found', async () => {
      request.params.id = '1';
      mockUsersService.findUserById.mockResolvedValue(null);

      await controller.update(request, response);

      expect(mockUsersService.findUserById).toHaveBeenCalledWith('1');
      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({
        message: 'User not found'
      });
    });
  });

  describe('destroy', () => {
    it('should delete a user if found', async () => {
      const user = { id: 1, name: 'John Doe' };
      request.params.id = '1';
      mockUsersService.findUserById.mockResolvedValue(user);

      await controller.destroy(request, response);

      expect(mockUsersService.findUserById).toHaveBeenCalledWith('1');
      expect(mockUsersService.deleteUser).toHaveBeenCalledWith('1');
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        message: 'User deleted successfully'
      });
    });

    it('should return 404 if user is not found', async () => {
      request.params.id = '1';
      mockUsersService.findUserById.mockResolvedValue(null);

      await controller.destroy(request, response);

      expect(mockUsersService.findUserById).toHaveBeenCalledWith('1');
      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({
        message: 'User not found'
      });
    });
  });
});
