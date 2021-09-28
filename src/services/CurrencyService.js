import axios from 'axios';

const CurrencyService = {
  getAll: async () => {
    const { data, status, statusText } = await axios.get('https://economia.awesomeapi.com.br/json/all');
    if (typeof data === 'object') {
      if (Object.prototype.hasOwnProperty.call(data, 'USDT')) {
        delete data.USDT;
      }
      Object.keys(data).forEach((key) => {
        data[key].name = data[key].name.split('/')[0];
      });
    }
    return {
      data,
      status,
      statusText,
    };
  },

  getByCode: async (currencyCode) => {
    const { data, status, statusText } = await axios.get(`https://economia.awesomeapi.com.br/json/${currencyCode}`);
    return {
      data,
      status,
      statusText,
    };
  },
};

export default CurrencyService;
