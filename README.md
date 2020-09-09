# Tinkoff API SDK
Simple SDK for Tinkoff API.

## Example usage
```nodejs
const TinkoffAPI = require('./api');
const { Tax, Taxation } = require('./api/types'); 
require('dotenv').config();
const bankApi = new TinkoffAPI(process.env.TINKOFF_TERMINAL_KEY, process.env.TINKOFF_SECRET_KEY);


bankApi.init({
  Amount: 10000,
  OrderId: 123,
  DATA: {
    Email: 'user@ya.ru',
    Phone: '+71234567890'
  },
  Receipt: {
    Email: 'user@ya.ru',
    Phone: '+71234567890',
    Taxation: Taxation.OSN,
    Items: [
      {
        Name: 'Наименование товара 1',
        Price: 100,
        Quantity: 100,
        Amount: 10000,
        Tax:  Tax.NONE,
        Ean13: '0123456789'
      }
    ]
  }
}).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err)
});

```

### Response
```
{ Success: true,
  ErrorCode: '0',
  TerminalKey: '...',
  Status: 'NEW',
  PaymentId: '...',
  OrderId: '123',
  Amount: 10000,
  PaymentURL: 'https://securepay.tinkoff.ru/new/...' }
```

## Run tests
Execute this command:
```shell script
yarn jest
```
