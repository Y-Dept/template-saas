SAAS化前端项目
====

> `NornJ`+`React`+`Mobx-state-tree`项目模板，可以此项目为模板快速创建新项目。

## 构建命令

```sh
npm run dev-web         #启动node端本地调试server，然后使用http://localhost:8080/dist/web访问页面
npm run build-web       #构建生产代码到dist目录
npm run build-web-test  #构建生产代码到dist目录，使用测试环境配置
```

#{learningGuide}#

## 如何接入公共接口

> 由此模板新创建的项目已经自动接入了，此文档是针对过去创建的老项目：

1. 将`saas-common`包升级至`0.1.22`版以上：

```sh
npm i saas-common@latest --registry http://192.168.151.68:8001
```

2. webpack.config.js文件添加`__COMMONHOST`全局变量：

```js
...
const { commonDomain } = require('saas-common');

...
module.exports.plugins = [
  ...
  new webpack.DefinePlugin({
    __ENV: (isProd || isTest) ? "'pro'" : "'dev'",
    __HOST: (isProd || isTest) ? "''" : "'http://localhost:8089/'",
    'process.env': {
      'NODE_ENV': JSON.stringify(isProd ? 'production' : 'development')
    },
    __JSPATH: JSON.stringify((isProd || isTest) ? '/' + process.env.Project + '/js/' : `/dist/${process.env.Project}/js/`),
    __COMMONHOST: (isProd || isTest) ? `'${commonDomain}'` : "'http://localhost:8089/'",
  }),
  ...
];
```

3. 修改rootStore.js中的链接`workbenchMenusUrl`和`systemMenusUrl`地址：

```js
...
const RootStore = types.model("RootStore", {
  common: types.optional(CommonStore, {}),

  header: types.optional(HeaderStore, {
    current: 0,
    workbenchMenusUrl: `${__COMMONHOST}${workbenchMenusUrl}`
  }),
  
  sider: types.optional(SiderStore, {
    isOpen: false,
    current: 'Page1_1',
    systemMenusUrl: `${__COMMONHOST}${systemMenusUrl}`,
    ...
  }),
  ...
});
...
```