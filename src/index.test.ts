import TinkoffAPI from '../dist';

describe('TokenGenerationTest', () => {
  const api = new TinkoffAPI('TerminalExample', '123456');

  test('should return valid sign', () => {
    expect(api.generateToken({
      Description: 'test',
      Amount: 100000,
      TerminalKey: 'TinkoffBankTest',
      OrderId: 38475456,
    })).toEqual('730fd3f6f06823d12fa325a286acbd3e8b7b70e2d0dce83d0de3993902932102');
  });

  test('should ignore data and receipt fields', () => {
    expect(api.generateToken({
      Description: 'test',
      Amount: 100000,
      TerminalKey: 'TinkoffBankTest',
      OrderId: 38475456,
      DATA: {
        User: 'user',
        Phone: '12345',
      },
    })).toEqual('730fd3f6f06823d12fa325a286acbd3e8b7b70e2d0dce83d0de3993902932102');
  });
});

describe('TokenNotifyTest', () => {
  const api = new TinkoffAPI('TerminalExample', 'Dfsfh56dgKl');

  test('should return valid token signature', () => {
    expect(api.generateToken({
      TerminalKey: '1321054611234DEMO',
      OrderId: 201709,
      PaymentId: 8742591,
      Amount: 9855,
      RebillId: 101709,
    })).toEqual('0b4533c60a4e18cf2a79ffcfab29dc05e441c60fba5d338309d14075c66bb4ac');
  });
});

/*
 * describe('Send request to Tinkoff API', () => {
 *   const api = new TinkoffAPI(process.env.TINKOFF_TERMINAL_KEY as string,
 *     process.env.TINKOFF_SECRET_KEY as string);
 *
 *   test('should return response', () => {
 *     expect(api.initPayment({
 *
 *     }));
 *   });
 * });
 */
