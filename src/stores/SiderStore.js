import { types, getParent } from "mobx-state-tree";
import { fetchData } from 'flarej/lib/utils/fetchConfig';
import Notification from '../utils/notification';

const MenuItem = types.model("MenuItem", {
    type: types.string,
    link: types.optional(types.string, ''),
    index: types.string,
    name: types.string,
    icon: types.optional(types.string, ''),
    expanded: types.optional(types.boolean, false),
    children: types.optional(types.union(types.array(types.late(() => MenuItem)), types.literal(null)), []),
    level: types.maybe(types.number)
  })
  .views(self => {
    return {
      get topMenuData() {
        return getParent(getParent(getParent(getParent(self))));
      },
      get topMenuIndex() {
        return getParent(self.topMenuData).indexOf(self.topMenuData);
      }
    }
  })
  .actions(self => {
    return {
      afterCreate() {
        if (self.level === 3) {
          const siderStore = getParent(getParent(self.topMenuData));
          if (!siderStore.mapLevel3) {
            siderStore.mapLevel3 = {}; //创建三级菜单map以便于查找
          }
          siderStore.mapLevel3[self.link.toLowerCase()] = self;
        }
      },
      setExpanded(isExpanded) {
        self.expanded = isExpanded
      }
    }
  });

const SiderStore = types.model("SiderStore", {
    isOpen: types.boolean,
    current: types.string,
    menuData: types.optional(types.array(MenuItem), []),
    systemMenusUrl: ''
  })
  .views(self => {
    return {
      get root() {
        return getParent(self);
      },
      get currentMenuData() {
        return self.menuData.length ? self.menuData[self.root.header.current].children : [];
      }
    }
  })
  .actions(self => {
    return {
      setMenu(isOpen) {
        self.isOpen = isOpen
      },
      setCurrent(index) {
        self.current = index
      },
      setMenuData(menuData) {
        self.menuData = menuData
      },
      setMenuDataByIndex(isExpanded, index) {
        self.currentMenuData.forEach(function(item) {
          item.setExpanded(false);
        })
        self.currentMenuData.find((item) => item.index == index).setExpanded(isExpanded);
      },

      setCurrentMenu() {
        let href = window.location.href;
        href = href.substring(href.lastIndexOf('#/') + 2, href.length);

        //初始化一级菜单
        let menu0 = self.menuData[0];
        if (href.trim() !== '') {
          if (self.mapLevel3['/' + href.toLowerCase()]) {
            self.root.header.setCurrent(self.mapLevel3['/' + href.toLowerCase()].topMenuIndex);
          }
        } else if (menu0) {
          self.root.header.setCurrent(0);
        }

        const menu = self.currentMenuData;
        const children = menu.map(function(item) {
          return item.children
        })
        const nameArray = children.map(function(item) {
          return item.map(function(item) {
            return item.index
          })
        })
        let index = 0;
        for (let i = 0; i < nameArray.length; i++) {
          for (let j = 0; j < nameArray[i].length; j++) {
            if (nameArray[i][j].toLowerCase() == href.toLowerCase()) {
              index = i;
              break;
            }
          }
          if (index !== 0) {
            break;
          }
        }

        if (href.trim() === '') {
          if (menu0) {
            if (menu0.children[0].children[0]) {
              self.setCurrent(menu0.children[0].children[0].index);
            } else {
              self.setCurrent(menu0.children[0].index);
            }
            window.location.hash = '/' + self.current;
            self.setMenuDataByIndex(true, menu0.children[0].index);
          }
        } else {
          self.setCurrent(href);
          self.setMenuDataByIndex(true, menu[index].index);
        }
      },

      getSystemMenus() {
        return fetchJsonp(self.systemMenusUrl, {
            jsonpCallback: 'callback',
            appId: 'tenant'
          })
          .then(response => {
            return response.json();
          }).then(self.setSystemMenus).catch(ex => {
            Notification.error({
              description: '获取系统菜单信息异常:' + ex,
              duration: null
            });
          });
      },
      setSystemMenus(result) {
        if (result.success) {
          self.menuData[0].children = result.data.map(menu => {
            const hasSubMenus = menu.subMenus && menu.subMenus.length;

            return {
              type: hasSubMenus ? 'group' : 'link-item',
              index: pascal(menu.urlId),
              expanded: false,
              icon: menu.iconName,
              link: '/' + pascal(menu.urlId),
              name: menu.name,
              children: hasSubMenus ? menu.subMenus.map(subMenu => {
                return {
                  type: 'item',
                  index: pascal(subMenu.urlId),
                  link: '/' + pascal(subMenu.urlId),
                  name: subMenu.name
                };
              }) : []
            };
          });
        } else {
          Notification.error({
            description: '获取系统菜单信息错误:' + result.message,
            duration: null
          });
        }
      },
    }
  });

export default SiderStore;