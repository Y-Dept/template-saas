import { types, getParent } from "mobx-state-tree";

const HeaderStore = types.model("HeaderStore", {
    current: types.number,
    workbenchMenusUrl: ''
  })
  .views(self => {
    return {
      get common() {
        return getParent(self).common;
      }
    };
  })
  .volatile(self => ({
    workbenchMenus: []
  }))
  .actions(self => {
    return {
      setCurrent(index) {
        self.current = index
      },

      getWorkbenchMenus() {
        return self.common.fetchJsonp(self.workbenchMenusUrl, {
            jsonpCallback: 'callback'
          })
          .then(response => {
            return response.json();
          }).then(self.setWorkbenchMenus).catch(ex => {
            self.common.Notification.error({
              description: '获取工作台菜单信息异常:' + ex,
              duration: null
            });
          });

        // return self.common.fetchData(self.workbenchMenusUrl,
        //   self.setWorkbenchMenus,
        //   null, { method: 'get' }).catch((ex) => {
        //   Notification.error({
        //     description: '获取工作台菜单信息异常:' + ex,
        //     duration: null
        //   });
        // });
      },
      setWorkbenchMenus(result) {
        if (result.success) {
          self.workbenchMenus = result.data;
        } else {
          self.common.Notification.error({
            description: '获取工作台菜单信息错误:' + result.message,
            duration: null
          });
        }
      }
    }
  });

export default HeaderStore