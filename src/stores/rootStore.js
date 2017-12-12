import { types } from "mobx-state-tree";
import { CommonStore } from "./commonStore";
import HeaderStore from "./headerStore";
import SiderStore from "./SiderStore";
import Page0_1Store from "./pages/page0_1Store";
import Page1_1Store from "./pages/page1_1Store";
import Page1_2Store from "./pages/page1_2Store";
import Page4_1Store from "./pages/page4_1Store";
//{importStore}//

const RootStore = types.model("RootStore", {
  common: types.optional(CommonStore, {}),

  header: types.optional(HeaderStore, {
    current: 0
  }),

  sider: types.optional(SiderStore, {
    isOpen: false,
    current: 'Page1_1',
    menuData: [
      {
      type: 'group',
      index: 'Menu1_1',
      name: '控制台',
      expanded: false,
      children: [{
        type: 'link-item',
        index: 'Page0_1',
        name: '总览',
        expanded: false,
        icon:'appstore-o',
        link: '/Page0_1',
        children: []
      }, {
        type: 'group',
        index: 'Menu2_2',
        name: '权限管理',
        expanded: false,
        icon:'idcard',
        children: [
          { type: 'item', level: 3, link: '/Page1_1', index: 'Page1_1', name: '用户管理' },
          { type: 'item', level: 3, link: '/Page1_2', index: 'Page1_2', name: '群组管理' },
          { type: 'item', level: 3, link: '/Page1_3', index: 'Page1_3', name: '角色管理' },
          { type: 'item', level: 3, link: '/Page1_4', index: 'Page1_4', name: '组织管理' }
        ]
      },
      {
        type: 'link-item',
        index: 'Menu2_3',
        name: '用户中心',
        expanded: false,
        icon:'user',
        link: '/Page2_1',
        children: []
      },
      {
        type: 'link-item',
        index: 'Menu2_4',
        name: '财务中心',
        expanded: false,
        icon:'area-chart',
        link: '/Page3_1',
        children: []
      },
      {
        type: 'link-item',
        index: 'Page4_1',
        name: '客服管理',
        expanded: false,
        icon:'phone',
        link: '/Page4_1',
        children: []
      }
    ]
    }, {
      type: 'group',
      index: 'Menu1_2',
      name: '产品服务',
      expanded: false,
      children: [{
        type: 'group',
        index: 'Menu2_3',
        name: '二级菜单3',
        expanded: false,
        children: [
          { type: 'item', level: 3, link: '/Page6_1', index: 'Page6_1', name: '页面6-1' },
          { type: 'item', level: 3, link: '/Page6_2', index: 'Page6_2', name: '页面6-2' },
        ]
      }, {
        type: 'group',
        index: 'Menu2_4',
        name: '二级菜单4',
        expanded: false,
        children: [
          { type: 'item', level: 3, link: '/Page7_1', index: 'Page7_1', name: '页面7-1' },
          { type: 'item', level: 3, link: '/Page7_2', index: 'Page7_2', name: '页面7-2' },
        ]
      }]
    }]
  }),

  page0_1: types.optional(Page0_1Store, {}),
  page1_1: types.optional(Page1_1Store, {}),
  page1_2: types.optional(Page1_2Store, {}),
  page4_1: types.optional(Page4_1Store, {}),
  //{pageStore}//
});

export default RootStore;
