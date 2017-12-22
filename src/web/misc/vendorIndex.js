import React from 'react';
import ReactDom from 'react-dom';
import * as ReactRouter from 'react-router';
import Mobx from 'mobx';
import * as MobxReact from 'mobx-react';
import * as MobxStateTree from 'mobx-state-tree';
import * as CoreDecorators from 'core-decorators';

const _global = typeof self !== 'undefined' ? self : global;
_global.React = React;
_global.ReactDom = ReactDom;
_global.ReactRouter = ReactRouter;
_global.Mobx = Mobx;
_global.MobxReact = MobxReact;
_global.MobxStateTree = MobxStateTree;
_global.CoreDecorators = CoreDecorators;