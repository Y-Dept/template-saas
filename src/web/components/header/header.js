import { Component, PropTypes } from 'react';
import { observable, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import { registerTmpl } from 'nornj-react';
import { autobind } from 'core-decorators';
import styles from './header.scss';
import template from './header.t.html';

@inject('store')
@observer
export default class Header extends Component {
  componentDidMount() {
    const { store: { header } } = this.props;
    header.getWorkbenchMenus();
  }

  @autobind
  navChanged(index) {
    return e => {
      this.props.store.header.setCurrent(index);
      if (this.props.store.sider.menuData[index].children[0].children[0]) {
        this.props.history.push('/' + this.props.store.sider.menuData[index].children[0].children[0].index);
      } else {
        this.props.history.push('/' + this.props.store.sider.menuData[index].children[0].index);
      }
    }
  }

  render() {
    return template(this.props, this, {
      styles
    });
  }
}