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
npm i saas-common@latest --registry http://ynpm.jd.com:8001
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

## 如何修改页面头部菜单链接

1. 将`saas-common`包升级至`0.1.24`版以上：

```sh
npm i saas-common@latest --registry http://ynpm.jd.com:8001
```

2. 修改`src/stores/rootStore.js`文件：

```js
...
sider: types.optional(SiderStore, {
  isOpen: false,
  current: 'Page1_1',
  systemMenusUrl: `${__COMMONHOST}${systemMenusUrl}`,
  menuData: [{
    type: 'group',
    index: 'Menu1_1',
    name: '控制台',               //头部菜单文字在这里修改
    link: 'http://www.xxx.com',  //在此处添加link参数为想要跳转的链接即可
    expanded: false,
    ...
  }, {
    type: 'dropdown',
    index: 'Workbench',
    name: '工作台',
    expanded: false,
  }, {
    type: 'group',
    index: 'Menu1_2',
    name: '产品服务',             //头部菜单文字在这里修改
    link: 'http://www.xxx.com',  //在此处添加link参数为想要跳转的链接即可
    expanded: false,
    ...
  }]
}),
```

## 如何将公共资源切换为从cdn获取

> cdn的测试环境需要配置host，[具体请见这里](http://source.jd.com/app/y-dept-saas-common#%E4%BD%BF%E7%94%A8%E6%B5%8B%E8%AF%95%E7%8E%AF%E5%A2%83cdn%E8%8E%B7%E5%8F%96%E5%85%AC%E5%85%B1%E8%B5%84%E6%BA%90%E6%97%B6%E9%9C%80%E9%85%8D%E7%BD%AE%E7%9A%84host)。

1. 将`saas-common`包升级至`0.1.28`版以上：

```sh
npm i saas-common@latest --registry http://ynpm.jd.com:8001
```

2. 修改`webpack.config.js`文件，具体步骤请看下面代码中的注释：

```js
...
const iconUrl = {
  "icon-url": JSON.stringify('../../../../vic-common/resources/libs/iconfont/iconfont')
};
const modifyVars = Object.assign({}, iconUrl, antdTheme);
const { commonDomain, commonCdnDomain } = require('saas-common');  //(1)增加导出commonCdnDomain变量
const useCdn = true;                                               //(2)增加是否使用cdn标识

const webpackExternals = {
  'saas-common': 'SaasCommon'
};

module.exports = {
  ...
}

module.exports.plugins = [
  ...
  new HtmlWebpackPlugin({
    filename: process.env.Project + '/index.html',
    template: './index.template-' + process.env.Project + '.html',
    inject: false,
    chunks: ['vendor', 'app'],
    path: (isProd || isTest) ? process.env.Project + '/' : `/dist/${process.env.Project}/`,
    //(3)增加commonPath变量
    commonPath: useCdn ? commonCdnDomain : ((isProd || isTest) ? process.env.Project + '/' : `/dist/${process.env.Project}/`),
    version: VERSION
  }),
  ...
]
```

3. 修改`index.template-web.html`文件，具体步骤请看下面代码中的注释：

```html
<#with {{ htmlWebpackPlugin.options }}>
<!DOCTYPE html>
<html>
<head>
  <title>Y事业部-SAAS平台</title>
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
  <meta name="format-detection" content="telephone=no" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!--<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,initial-scale=1.0" />-->
  <script src="{{ path }}js/es6-promise.auto.min.js"></script>
  <link href="{{ path }}css/{{ version }}/app.css" rel="stylesheet">
  <link href="{{ commonPath }}saas-common/saas-common.min.css" rel="stylesheet">  <!--(1)将path改为commonPath-->
  <link href="{{ commonPath }}saas-theme.min.css" rel="stylesheet">               <!--(2)将path改为commonPath-->
</head>
<body>
  <div id="app" style="position:relative"></div>
  <script src="{{ path }}js/console-polyfill.js"></script>
  <script src="{{ path }}js/jquery-3.1.1.min.js"></script>
  <script src="{{ path }}js/babelHelpers.min.js"></script>
  <script type="text/javascript" src="{{ path + version }}/vendors.min.js"></script>
  <script type="text/javascript" src="{{ commonPath }}saas-common/saas-common.min.js"></script>  <!--(3)将path改为commonPath-->
  <script type="text/javascript" src="{{ path + version }}/app.js"></script>
</body>
</html>
</#with>
```