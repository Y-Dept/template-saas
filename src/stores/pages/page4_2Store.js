import { types } from "mobx-state-tree";
import { toJS } from 'mobx';
import { fetchData } from 'flarej/lib/utils/fetchConfig';
import Notification from '../../utils/notification';

const Page4_2Store = types.model("Page4_2Store", {
    initialContent: 'Hello World!',
    content: ''
  })
  .actions(self => ({
    setInitialContent(v) {
      self.initialContent = v;
    },
    setContent(v) {
      self.content = v;
    },

    uploadFile(params) {
      return fetchData(`${__HOST}page4_2/uploadFile`,
        self.setUploadFile,
        params, {
          method: 'post',
          useApplicationJson: false
        }).catch((ex) => {
        Notification.error({
          description: '上传图片异常:' + ex,
          duration: null
        });
      });
    },

    setUploadFile(result) {
      let imgUrl = '';
      if (result.success) {
        imgUrl = result.data;
      } else {
        Notification.error({
          description: '上传图片错误:' + result.message,
          duration: null
        });
      }

      return imgUrl;
    },
  }));

export default Page4_2Store;