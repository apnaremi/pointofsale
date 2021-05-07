const isProd = false;
const ApiConstants = {
  BASE_URL: isProd
    ? 'https://au.myaccountant.io'
    : 'https://dev.myaccountant.io',
  LOGIN: '/api/token',
};

export default ApiConstants;
