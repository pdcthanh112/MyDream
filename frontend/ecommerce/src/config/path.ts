const path = {
    home: '/',
    account: '/account',
    profile: '/manage/profile',
    changePassword: '/auth/change-password',
    notification: '/manage/notification',
    vouchers: '/manage/vouchers',
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/logout',
    product: '/product/:slug',
    cart: '/cart',
    history: '/history',
    wishlist: '/wishlist'
  } as const
  export default path