import { Component } from 'react'
import { pascal } from './src/utils/util';

class Bundle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // short for "module" but that's a keyword in js, so "mod"
      mod: null
    }
  }

  componentWillMount() {
    const { store, isPc, loadBundles } = this.props;
    if (store && !store.sider.menuData[0].children.length) { //获取用户登录信息
      const fetchs = [
        store.common.getCurrentUserInfo()
      ];
      if (isPc) {
        fetchs.push(
          Promise.all([
            store.sider.getSystemMenus()
          ]).then(() => store.sider.setCurrentMenu())
        );
      }
      Promise.all(fetchs).then(() => {
        if (isPc) {
          const current = store.sider.current;
          this.load({ load: loadBundles[`load${pascal(current.indexOf('/') >= 0 ? current.split('/')[0] : current)}`] });
        } else {
          this.load(this.props);
        }
      });
    } else {
      if (isPc) {
        store.sider.setCurrentMenu();
      }
      this.load(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {
    this.setState({
      mod: null
    })
    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null
  }
}

export default Bundle;