const isProd = false;
const ApiConstants = {
  BASE_URL: isProd
    ? 'https://au.myaccountant.io'
    : 'https://dev.myaccountant.io',
  LOGIN: '/api/token',
  FORGET_PASSWORD: '/api/accounts/password/forget',
  CODE_VERIFY: '/api/token/verify',
  RESEND_CODE_VERIFY: '/api/token/resendverification',
  ACCOUNTS: '/api/accounts',
  ORDERING_SETTINGS: '/api/ordering/settings',
  ORDERING: '/api/ordering',
  DOWNLOAD_QR_CODE: '/api/ordering/downladqrcode',
  ORDERING_CATEGORY: '/api/ordering/category',
  SEATING_ARRANGEMENT: '/api/ordering/seatingarrangement',
  INVOICE_ITEMS: '/api/invoiceitems',
  INVOICE_CUSTOMERS: '/api/invoicecustomers',
};

export default ApiConstants;
