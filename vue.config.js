module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vuex-orm-sample/'
    : '/',
  transpileDependencies: ["vuetify"],
};
