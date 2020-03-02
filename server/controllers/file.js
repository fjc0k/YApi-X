const fileModel = require('../models/file.js')
const yapi = require('../yapi.js')
const baseController = require('./base.js')

// 200 KB
const FILE_MAX_SIZE = 200 * 1024

class fileController extends baseController {
  constructor(ctx) {
    super(ctx)
    this.model = yapi.getInst(fileModel)
  }

  /**
   * 上传文件。
   */
  async upload(ctx) {
    const {mimeType, name, base64, extra} = ctx.request.body

    if (!name || !base64 || !mimeType) {
      ctx.body = yapi.commons.resReturn(null, 400, '字段缺失')
      return
    }

    if (base64.length > FILE_MAX_SIZE) {
      ctx.body = yapi.commons.resReturn(null, 400, '文件大小超过限制')
      return
    }

    const file = await this.model.save({
      name: name,
      mimeType: mimeType,
      base64: base64,
      extra: extra,
    })

    ctx.body = yapi.commons.resReturn({
      id: file._id,
    })
  }

  /**
   * 下载文件。
   */
  async download(ctx) {
    const {id} = ctx.request.query

    const file = await this.model.get(id)

    if (!file) {
      ctx.body = yapi.commons.resReturn(null, 404, '文件不存在')
      return
    }

    ctx.set('Content-Type', file.mimeType)
    ctx.set('Cache-Control', 'max-age=315360000')

    ctx.body = new Buffer(file.base64, 'base64')
  }
}

module.exports = fileController
