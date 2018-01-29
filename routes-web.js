import React from 'react';
import Bundle from './bundle'
import { withRouter, Redirect } from 'react-router'
import { Switch, Route } from 'react-router-dom';
import { observer, Provider, inject } from 'mobx-react';
import loadPage0_1 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page0_1/page0_1.js';
import loadPage1_1 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page1_1/page1_1.js';
import loadPage1_2 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page1_2/page1_2.js';
import loadPage4_1 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page4_1/page4_1.js';
import loadPage4_2 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page4_2/page4_2.js';
import loadPage4_3 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page4_3/page4_3.js';
//{importLoadPage}//

const loadBundles = {
  loadPage0_1,
  loadPage1_1,
  loadPage1_2,
  loadPage4_1,
  loadPage4_2,
  loadPage4_3,
  //{loadPage}//
};

/**
 * 页面0-1
 */
const Page0_1 = inject("store")(
  observer(({ store }) => nj`
    <${PageWrap}>
      <${Bundle} load=${loadPage0_1} store=${store} isPc loadBundles=${loadBundles}>
        ${(_Page0_1) => {
          const Page0_1 = withRouter(_Page0_1)
          return nj`<${Page0_1}/>`();
        }}
      </${Bundle}>
    </${PageWrap}>
  `())
);

/**
 * 页面1-1
 */
const Page1_1 = inject("store")(
  observer(({ store }) => nj`
    <${PageWrap}>
      <${Bundle} load=${loadPage1_1} store=${store} isPc loadBundles=${loadBundles}>
        ${(_Page1_1) => {
          const Page1_1 = withRouter(_Page1_1)
          return nj`<${Page1_1}/>`();
        }}
      </${Bundle}>
    </${PageWrap}>
  `())
);

/**
 * 页面1-2
 */
const Page1_2 = inject("store")(
  observer(({ store }) => nj`
    <${PageWrap}>
      <${Bundle} load=${loadPage1_2} store=${store} isPc loadBundles=${loadBundles}>
        ${(_Page1_2) => {
          const Page1_2 = withRouter(_Page1_2)
          return nj`<${Page1_2}/>`();
        }}
      </${Bundle}>
    </${PageWrap}>
  `())
);

/**
 * 页面4-1
 */
const Page4_1 = inject("store")(
  observer(({ store }) => nj`
    <${PageWrap}>
      <${Bundle} load=${loadPage4_1} store=${store} isPc loadBundles=${loadBundles}>
        ${(_Page4_1) => {
          const Page4_1 = withRouter(_Page4_1)
          return nj`<${Page4_1}/>`();
        }}
      </${Bundle}>
    </${PageWrap}>
  `())
);

/**
 * 页面4-2
 */
const Page4_2 = inject("store")(
  observer(({ store }) => nj`
    <${PageWrap}>
      <${Bundle} load=${loadPage4_2} store=${store} isPc loadBundles=${loadBundles}>
        ${(_Page4_2) => {
          const Page4_2 = withRouter(_Page4_2)
          return nj`<${Page4_2}/>`();
        }}
      </${Bundle}>
    </${PageWrap}>
  `())
);


/**
 * 页面4-3
 */
const Page4_3 = inject("store")(
  observer(({ store }) => nj`
    <${PageWrap}>
      <${Bundle} load=${loadPage4_3} store=${store} isPc loadBundles=${loadBundles}>
        ${(_Page4_3) => {
          const Page4_3 = withRouter(_Page4_3)
          return nj`<${Page4_3}/>`();
        }}
      </${Bundle}>
    </${PageWrap}>
  `())
);

//{pageComponent}//

const PageWrap = inject("store")(
  observer(({ store, children }) => nj`
    <div id="page-wrap" className=${store.sider.isOpen ? 'isMenuOpen' : ''}>
      ${children}
    </div>
  `())
);

const routes = () => nj`
  <router-Switch>
    <Route exact path='/' component=${Page0_1}/>
    <Route exact path='/Page0_1' component=${Page0_1} />
    <Route exact path='/Page1_1' component=${Page1_1} />
    <Route exact path='/Page1_2' component=${Page1_2} />
    <Route exact path='/Page4_1' component=${Page4_1} />
    <Route exact path='/Page4_2' component=${Page4_2} />
    <Route exact path='/Page4_3' component=${Page4_3} />
    <!--//{route}//-->
    <Redirect from='*' to='/'/>
  </router-Switch>
`();

export default routes;
