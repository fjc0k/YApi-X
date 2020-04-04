import PropTypes from 'prop-types'
import React from 'react'
import { Alert } from 'antd'

exports.initCrossRequest = function (fn) {
  let startTime = 0
  const _crossRequest = setInterval(() => {
    startTime += 500
    if (startTime > 5000) {
      clearInterval(_crossRequest)
    }
    if (window.crossRequest) {
      clearInterval(_crossRequest)
      fn(true)
    }
    else {
      fn(false)
    }
  }, 500)
  return _crossRequest
}
CheckCrossInstall.propTypes = {
  hasPlugin: PropTypes.bool,
}
function CheckCrossInstall(props) {
  const hasPlugin = props.hasPlugin
  return (
    <div className={hasPlugin ? null : 'has-plugin'}>
      {hasPlugin ? (
        ''
      ) : (
        <Alert
          message={(
            <div>
              运行接口需安装浏览器插件，<a href='https://github.com/fjc0k/YApi-X/tree/master/chrome-extension#readme'>查看安装教程→</a>
            </div>
          )}
          type='error'
          style={{ margin: 10 }}
        />
      )}
    </div>
  )
}

export default CheckCrossInstall
