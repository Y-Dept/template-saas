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

> 由此模板新创建的项目已经自动接入了，此文档的`前5步`是针对过去创建的老项目：

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

4. 添加获取用户信息接口

(1)在`server/common/routes`目录下创建`common.js`文件，从[这里](https://github.com/Y-Dept/template-saas/blob/master/server/routes/common.js)复制过来就可以。

(2)在`server/app.js`文件中添加：

```js
...
const common = require('./routes/common');
app.use('/authManagement/common', common);
...
```

(3)更新`src/stores/commonStore.js`文件，从[这里](https://github.com/Y-Dept/template-saas/blob/master/src/stores/commonStore.js)覆盖过来就可以。

(4)在`Bundle.js`中取消掉注释：

```js
...
componentWillMount() {
  const { store, isPc, loadBundles } = this.props;
  if (store && !store.sider.menuData[0].children.length) {
    const fetchs = [
      store.common.getCurrentUserInfo()  //取消这里的注释
    ];
  }
}
...
```

5. 添加注销接口，修改`app-web.js`文件，给`HeaderWithRouter`组件添加`logoutUrl`属性：

```js
const renderApp = appRoutes => {
  ReactDOM.render(nj `
    <${LocaleProvider} locale=${zhCN}>
      <mobx-Provider store=${rootStore}>
        <HashRouter>
          <div id="outer-container">
            <${SiderWithRouter}/>
            <${HeaderWithRouter} logoutUrl=${`${__COMMONHOST}authManagement/common/logout`}/>
            ${appRoutes()}
          </div>
        </HashRouter>
      </mobx-Provider>
    </${LocaleProvider}>` (),
    document.getElementById('app')
  );
};
```

6. 将siderStore.js中的`getSystemMenus`接口的`appid`参数改为SAAS子应用的`appid`：

```js
...
getSystemMenus() {
  return fetchJsonp(`${self.systemMenusUrl}?appId=tenant`, {  //把tenant改为SAAS子应用的appid
      jsonpCallback: 'callback'
    })
    ...
},
...
```

## 如何更新本地项目模板文件

使用`nornj-cli`的`nj ap`等命令时会从项目目录的`templates`文件夹获取各文件的模板，如需更新只需将[此目录](https://github.com/Y-Dept/template-saas/tree/master/templates)内的文件覆盖到本地项目目录的`templates`文件夹即可。