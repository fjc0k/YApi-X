import ProjectEnv from './ProjectEnv/index.js'
import ProjectMessage from './ProjectMessage/ProjectMessage.js'
import ProjectMock from './ProjectMock/index.js'
import ProjectRequest from './ProjectRequest/ProjectRequest'
import ProjectToken from './ProjectToken/ProjectToken'
import PropTypes from 'prop-types'
import React, {PureComponent as Component} from 'react'
import {connect} from 'react-redux'
import {Tabs} from 'antd'

const TabPane = Tabs.TabPane
const plugin = require('client/plugin.js')

const routers = {}

import './Setting.scss'

@connect(state => {
  return {
    curProjectRole: state.project.currProject.role,
  }
})
class Setting extends Component {
  static propTypes = {
    match: PropTypes.object,
    curProjectRole: PropTypes.string,
  };

  render() {
    const id = this.props.match.params.id
    plugin.emitHook('sub_setting_nav', routers)
    return (
      <div className='g-row'>
        <Tabs type='card' className='has-affix-footer tabs-large'>
          <TabPane key='1' tab='项目配置'>
            <ProjectMessage projectId={+id} />
          </TabPane>
          <TabPane key='2' tab='环境配置'>
            <ProjectEnv projectId={+id} />
          </TabPane>
          <TabPane key='3' tab='请求配置'>
            <ProjectRequest projectId={+id} />
          </TabPane>
          {this.props.curProjectRole !== 'guest' ? (
            <TabPane key='4' tab='token配置'>
              <ProjectToken projectId={+id} curProjectRole={this.props.curProjectRole} />
            </TabPane>
          ) : null}
          <TabPane key='5' tab='全局mock脚本'>
            <ProjectMock projectId={+id} />
          </TabPane>
          {Object.keys(routers).map(key => {
            const C = routers[key].component
            return (
              <TabPane key={routers[key].name} tab={routers[key].name}>
                <C projectId={+id} />
              </TabPane>
            )
          })}
        </Tabs>
      </div>
    )
  }
}

export default Setting
