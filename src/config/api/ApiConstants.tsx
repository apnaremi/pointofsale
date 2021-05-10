const isProd = true;
const ApiConstants = {
  BASE_URL: isProd
    ? 'https://au.myaccountant.io'
    : 'https://dev.myaccountant.io',
  LOGIN: '/api/token',
  FORGET_PASSWORD: '/api/accounts/password/forget',
  CODE_VERIFY: '/api/token/verify',
};

export default ApiConstants;
