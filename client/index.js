/* eslint-disable react/jsx-filename-extension */
import './plugin'
import './styles/common.scss'
import './styles/theme.less'
import App from './Application'
import createStore from './reducer/create'
import React from 'react'
import ReactDOM from 'react-dom'
import {LocaleProvider} from 'antd'
import {Provider} from 'react-redux'

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN'

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById('yapi'),
)
