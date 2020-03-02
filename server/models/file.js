const baseModel = require('./base.js')

class fileModel extends baseModel {
  getName() {
    return 'file'
  }

  getSchema() {
    return {
      name: String,
      mimeType: String,
      base64: String,
      extra: Object,
    }
  }

  save(data) {
    const m = new this.model(data)
    return m.save()
  }

  get(id) {
    return this.model.findOne({
      _id: id,
    })
  }

  del(id) {
    return this.model.remove({
      _id: id,
    })
  }
}

module.exports = fileModel
