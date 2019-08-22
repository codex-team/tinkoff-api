const TinkoffAPI = require('./api');
require('dotenv').config();
const bankApi = new TinkoffAPI(process.env.TINKOFF_TERMINAL_KEY, process.env.TINKOFF_SECRET_KEY);


bankApi.init({
  Amount: '100000',
  OrderId: '123',
  DATA: {
    Email: 'user@ya.ru',
    Phone: '+71234567890'
  },
  Receipt: {
    Email: 'user@ya.ru',
    Phone: '+71234567890',
    Taxation: 'osn',
    Items: [
      {
        Name: 'Наименование товара 1',
        Price: 100,
        Quantity: 100,
        Amount: 10000,
        Tax: 'none',
        Ean13: '0123456789'
      }
    ]
  }
}).then(res => {
  // console.log(bankApi.checkNotificationRequest(res))
  console.log(res);
}).catch(err => {
  console.log(err)
});
