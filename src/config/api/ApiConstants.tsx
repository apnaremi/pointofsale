const isProd = true;
const ApiConstants = {
  BASE_URL: isProd
    ? 'https://au.myaccountant.io'
    : 'https://dev.myaccountant.io',
  LOGIN: '/api/token',
  FORGET_PASSWORD: '/api/accounts/password/forget',
  CODE_VERIFY: '/api/token/verify',
  RESEND_CODE_VERIFY: '/api/token/resendverification',
  ACCOUNTS: '/api/accounts',
  CHANGE_PASSWORD: 'Auth/ChangePassword',
};

export default ApiConstants;
