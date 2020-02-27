/* eslint-disable react/jsx-filename-extension */
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Loading from './components/Loading/Loading'
import MyPopConfirm from './components/MyPopConfirm/MyPopConfirm'
import Notify from './components/Notify/Notify'
import PropTypes from 'prop-types'
import React, {PureComponent as Component} from 'react'
import ReactDOM from 'react-dom'
import User from './containers/User/User.js'
import {AddProject, Follows, Group, Home, Login, Project} from './containers/index'
import {Alert} from 'antd'
import {checkLoginState} from './reducer/modules/user'
import {connect} from 'react-redux'
import {requireAuthentication} from './components/AuthenticatedComponent'
import {Route, BrowserRouter as Router} from 'react-router-dom'

const plugin = require('client/plugin.js')

const LOADING_STATUS = 0

const alertContent = () => {
  const ua = window.navigator.userAgent
  const isChrome = ua.indexOf('Chrome') && window.chrome
  if (!isChrome) {
    return (
      <Alert
        style={{zIndex: 99}}
        message={'YApi 的接口测试等功能仅支持 Chrome 浏览器，请使用 Chrome 浏览器获得完整功能。'}
        banner={true}
        closable={true}
      />
    )
  }
}

const AppRoute = {
  home: {
    path: '/',
    component: Home,
  },
  group: {
    path: '/group',
    component: Group,
  },
  project: {
    path: '/project/:id',
    component: Project,
  },
  user: {
    path: '/user',
    component: User,
  },
  follow: {
    path: '/follow',
    component: Follows,
  },
  addProject: {
    path: '/add-project',
    component: AddProject,
  },
  login: {
    path: '/login',
    component: Login,
  },
}
// 增加路由钩子
plugin.emitHook('app_route', AppRoute)

@connect(
  state => {
    return {
      loginState: state.user.loginState,
      curUserRole: state.user.role,
    }
  },
  {
    checkLoginState,
  },
)
class App extends Component {
  static propTypes = {
    checkLoginState: PropTypes.func,
    loginState: PropTypes.number,
    curUserRole: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      login: LOADING_STATUS,
    }
  }

  componentDidMount() {
    this.props.checkLoginState()
  }

  showConfirm = (msg, callback) => {
    // 自定义 window.confirm
    // http://reacttraining.cn/web/api/BrowserRouter/getUserConfirmation-func
    const container = document.createElement('div')
    document.body.appendChild(container)
    ReactDOM.render(<MyPopConfirm msg={msg} callback={callback} />, container)
  };

  route = status => {
    if (status === LOADING_STATUS) {
      return <Loading visible={true} />
    }
    return (
      <Router getUserConfirmation={this.showConfirm}>
        <div className='g-main'>
          <div className='router-main'>
            {this.props.curUserRole === 'admin' && <Notify />}
            {alertContent()}
            {this.props.loginState !== 1 ? <Header /> : null}
            <div className='router-container'>
              {Object.keys(AppRoute).map(key => {
                const item = AppRoute[key]
                return key === 'login'
                  ? (
                    <Route key={key} path={item.path} component={item.component} />
                  )
                  : key === 'home'
                    ? (
                      <Route key={key} exact={true} path={item.path} component={item.component} />
                    )
                    : (
                      <Route
                        key={key}
                        path={item.path}
                        component={requireAuthentication(item.component)}
                      />
                    )
              })}
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    )
  }

  render() {
    return this.route(this.props.loginState)
  }
}

export default App
