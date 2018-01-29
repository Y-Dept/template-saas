import { types, getParent } from "mobx-state-tree";

const HeaderStore = types.model("HeaderStore", {
    current: types.number
  })
  .views(self => {
    return {
      get common() {
        return getParent(self).common;
      }
    };
  })
  .actions(self => {
    return {
      setCurrent(index) {
        self.current = index
      }
    }
  });

export default HeaderStore