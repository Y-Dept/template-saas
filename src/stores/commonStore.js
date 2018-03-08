import { types, } from "mobx-state-tree"
import { fetchData } from 'flarej/lib/utils/fetchConfig';
import Notification from '../utils/notification';
import fetchJsonp from 'fetch-jsonp';

export const UserInfo = types.model('UserInfo', {
  pin: types.maybe(types.string),
  name: types.maybe(types.string),
})

export const CommonStore = types.model("CommonStore", {
    userInfo: types.maybe(UserInfo),
  })
  .volatile(self => ({
    fetchData,
    Notification,
    fetchJsonp
  }))
  .actions(self => {
    return {
      getCurrentUserInfo() {
        return fetchJsonp(`${__COMMONHOST}authManagement/common/getCurrentUserInfo`, {
          jsonpCallback: 'callback'
        })
        .then(response => {
          return response.json();
        }).then(self.setCurrentUserInfo).catch(ex => {
          Notification.error({
            description: '获取用户信息异常:' + ex,
            duration: null
          });
        });
      },
      setCurrentUserInfo(result) {
        if (result.success) {
          self.userInfo = result.data;
        } else {
          Notification.error({
            description: '获取用户信息错误:' + result.message,
            duration: null
          });
        }
      }
    }
  });

export const Category = types.model("Category", {
  value: '0',
  label: ''
});

export const Brand = types.model("Category", {
  value: '0',
  label: ''
});