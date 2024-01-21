const path = {
    home: '/',
    profile: '/user/profile',
    changePassword: '/user/password',
    historyPurchase: '/user/purchase',
    notification: '/user/notification',
    vouchers: '/user/vouchers',
    user: '/user',
    login: '/login',
    register: '/register',
    logout: '/logout',
    productDetail: ':slug',
    cart: '/cart',
    history: '/history'
  } as const
  export default path