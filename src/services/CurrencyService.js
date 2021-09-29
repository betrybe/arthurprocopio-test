const CurrencyService = {
  getAll: async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    if (typeof data === 'object') {
      if (Object.prototype.hasOwnProperty.call(data, 'USDT')) {
        delete data.USDT;
      }
      Object.keys(data).forEach((key) => {
        const [fistName] = data[key].name.split('/');
        data[key].name = fistName;
      });
    }
    return {
      data,
      status: response.status,
      statusText: response.statusText,
    };
  },

  getByCode: async (currencyCode) => {
    const response = await fetch(`https://economia.awesomeapi.com.br/json/${currencyCode}`);
    const data = await response.json();
    return {
      data,
      status: response.status,
      statusText: response.statusText,
    };
  },
};

export default CurrencyService;
