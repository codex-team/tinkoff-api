import TinkoffAPI from '../dist';

describe('TokenGenerationTest', () => {
  const api = new TinkoffAPI('TerminalExample', '123456');

  test('should return valid sign', () => {
    expect(api.generateToken({
      Description: 'test',
      Amount: '100000',
      TerminalKey: 'TinkoffBankTest',
      OrderId: 'TokenExample',
    })).toEqual('597c160c8c348fb14c63c820c54b712468923a74fd111ac6b0ecda01fb5f4716');
  });

  test('should ignore data and receipt fields', () => {
    expect(api.generateToken({
      Description: 'test',
      Amount: '100000',
      TerminalKey: 'TinkoffBankTest',
      OrderId: 'TokenExample',
      DATA: {
        User: 'user',
        Phone: '12345',
      },
    })).toEqual('597c160c8c348fb14c63c820c54b712468923a74fd111ac6b0ecda01fb5f4716');
  });
});

describe('TokenNotifyTest', () => {
  const api = new TinkoffAPI('TerminalExample', 'Dfsfh56dgKl');

  test('should return valid token signature', () => {
    expect(api.generateToken({
      TerminalKey: '1321054611234DEMO',
      OrderId: '201709',
      Success: 'true',
      Status: 'AUTHORIZED',
      PaymentId: '8742591',
      ErrorCode: '0',
      Amount: '9855',
      CardId: '322264',
      Pan: '430000******0777',
      ExpDate: '1122',
      RebillId: '101709',
    })).toEqual('b906d28e76c6428e37b25fcf86c0adc52c63d503013fdd632e300593d165766b');
  });
});
