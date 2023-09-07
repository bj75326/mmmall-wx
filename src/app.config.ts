export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/catalog/catalog',
    'pages/cart/cart',
    'pages/ucenter/index/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    backgroundColor: '#fafafa',
    borderStyle: 'white',
    selectedColor: '#AB956D',
    color: '#666',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: './static/images/home.png',
        selectedIconPath: './static/images/home@selected.png',
        text: '首页',
      },
      {
        pagePath: 'pages/catalog/catalog',
        iconPath: './static/images/category.png',
        selectedIconPath: './static/images/category@selected.png',
        text: '分类',
      },
      {
        pagePath: 'pages/cart/cart',
        iconPath: './static/images/cart.png',
        selectedIconPath: './static/images/cart@selected.png',
        text: '购物车',
      },
      {
        pagePath: 'pages/ucenter/index/index',
        iconPath: './static/images/my.png',
        selectedIconPath: './static/images/my@selected.png',
        text: '个人',
      },
    ],
  },
  networkTimeout: {
    request: 10000,
    downloadFile: 10000,
  },
  debug: true,
});
