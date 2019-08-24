const TinkoffAPI = require('./api');

describe('TokenGenerationTest', () => {
  const api = new TinkoffAPI('TerminalExample', '123456');

  test('should return valid sign', () => {
    expect(api.generateToken({
      Description: 'test',
      Amount: '100000',
      TerminalKey: 'TinkoffBankTest',
      OrderId: 'TokenExample'
    })).toEqual('597c160c8c348fb14c63c820c54b712468923a74fd111ac6b0ecda01fb5f4716');
  });

  test('should ignore data and receipt fields', () => {
    expect(api.generateToken({
      Description: 'test',
      Amount: '100000',
      TerminalKey: 'TinkoffBankTest',
      OrderId: 'TokenExample',
      Data: {
        User: 'user',
        Phone: '12345'
      }
    })).toEqual('597c160c8c348fb14c63c820c54b712468923a74fd111ac6b0ecda01fb5f4716');
  });
});
