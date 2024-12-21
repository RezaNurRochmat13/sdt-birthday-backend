// Import dependencies
import cron from 'node-cron';
import moment from 'moment-timezone';
import { MessageService } from '../service/message.service';

jest.mock('node-cron');
jest.mock('moment-timezone', () => ({
  tz: jest.fn(() => ({ format: jest.fn() }))
}));

const mockUsersRepository = {
  all: jest.fn()
};
const mockMessageRepository = {
  all: jest.fn(),
  save: jest.fn()
};
const mockFetch = jest.fn();

jest.mock('../repository/user.repository', () => () => mockUsersRepository);
jest.mock('../repository/message.repository', () => () => mockMessageRepository);
global.fetch = mockFetch;

describe('MessageService', () => {
  let service: any;

  beforeEach(() => {
    jest.clearAllMocks();
    service = MessageService('09:00'); // Inject targetTime for testing
  });

  describe('findAllMessages', () => {
    it('should return all messages', async () => {
      const messages = [{ id: 1, messageContent: 'Test message' }];
      mockMessageRepository.all.mockResolvedValue(messages);

      const result = await service.findAllMessages();

      expect(mockMessageRepository.all).toHaveBeenCalled();
      expect(result).toEqual(messages);
    });
  });

  describe('setupCronJobsSendingMessages', () => {
    it('should set up cron jobs for each user', async () => {
      const users = [
        { id: 1, firstName: 'John', timezone: 'America/New_York', email: 'john@example.com' },
        { id: 2, firstName: 'Jane', timezone: 'Europe/London', email: 'jane@example.com' }
      ];
      mockUsersRepository.all.mockResolvedValue(users);
  
      // Mock the format method for each timezone
      const formatMock = jest.fn(() => '09:00');
      (moment.tz as unknown as jest.Mock).mockReturnValue({ format: formatMock });
  
      await service.setupCronJobsSendingMessages();
  
      expect(mockUsersRepository.all).toHaveBeenCalled();
      expect(moment.tz).toHaveBeenCalledTimes(users.length);
      expect(formatMock).toHaveBeenCalledTimes(users.length);
      expect(cron.schedule).toHaveBeenCalledTimes(users.length);
    });
  });

  describe('sendingMessages', () => {
    it('should send messages to email service and save to database', async () => {
      const user = { id: 1, firstName: 'John', email: 'john@example.com' };
      const message = 'Happy birthday John!';

      mockFetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue({ success: true })
      });
      mockMessageRepository.save.mockResolvedValue(user);

      await service.sendingMessages(user, message);

      expect(mockFetch).toHaveBeenCalledWith('https://email-service.digitalenvision.com.au/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, message })
      });
      expect(mockMessageRepository.save).toHaveBeenCalledWith({
        sentUserId: user.id,
        messageContent: message,
        messageSentAt: expect.any(Date)
      });
    });
  });

  describe('sendMessageToEmailService', () => {
    it('should send a POST request to the email service', async () => {
      const email = 'john@example.com';
      const message = 'Hello, John!';

      mockFetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue({ success: true })
      });

      const result = await service.sendMessageToEmailService(email, message);

      expect(mockFetch).toHaveBeenCalledWith('https://email-service.digitalenvision.com.au/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message })
      });
      expect(result).toEqual({ success: true });
    });
  });

  describe('sendMessageToDatabase', () => {
    it('should save the message to the database', async () => {
      const message = {
        sentUserId: 1,
        messageContent: 'Hello, John!',
        messageSentAt: new Date()
      };

      await service.sendMessageToDatabase(message);

      expect(mockMessageRepository.save).toHaveBeenCalledWith(message);
    });
  });
});
