// Import dependencies

import MessageController from "../../controller/messages.controller";
import { MessageService } from "../../service/message.service";

jest.mock('../service/message.service');

const mockMessageService = {
  findAllMessages: jest.fn()
};

MessageService.mockReturnValue(mockMessageService);

describe('MessageController', () => {
  let controller: any;
  let request: any;
  let response: any;

  beforeEach(() => {
    controller = MessageController();
    request = { params: {}, body: {} };
    response = {
      status: jest.fn(() => response),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  describe('index', () => {
    it('should return all messages with a 200 status', async () => {
      const messages = [
        { id: 1, messageContent: 'Test message', messageSentAt: '2024-12-21T10:00:00Z' }
      ];
      mockMessageService.findAllMessages.mockResolvedValue(messages);

      await controller.index(request, response);

      expect(mockMessageService.findAllMessages).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        message: 'Messages retrieved successfully',
        data: messages
      });
    });
  });
});
