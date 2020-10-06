import {MessageService} from './message.service';

describe('mesage.service', () => {
  it('should have no message to start', () => {
    const service = new MessageService();
    expect(service.messages.length).toBe(0);
  });

  it('should have add 1 message when add is called', () => {
    const service = new MessageService();
    service.add('first messsage');

    expect(service.messages.length).toBe(1);
  });

  it('should remove all the messages when clean is called', () => {
    const service = new MessageService();
    service.add('first messsage');
    service.add('second messsage');

    service.clear();
    expect(service.messages.length).toBe(0);
  });
});
