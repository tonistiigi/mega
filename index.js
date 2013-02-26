if (process.browser) {
  global.Buffer = require('buffer').Buffer
}
var mega = require('mega')
var reactive = require('reactive')
var Emitter = require('emitter')
var $ = require('jquery-browserify')

var data = {}
Emitter(data)

function update(val) {
  for (var key in val) {
    data[key] = val[key]
    data.emit('change ' + key, val[key])
  }
}

data.on('change url', function(url) {
  try {
    mega.file(url).loadAttributes(function(err, file) {
      if (err) {
        return update({url_error: err.message})
      }
      update({
        url_error: false,
        name: file.name,
        size: file.size
      })
    })
  } catch (err) {
    update({url_error: err})
  }
})

data.on('change url_error', function(error) {
  update({url_success: !error})
})


$(function() {
  reactive(document.body, data, {
    urlchange: function(e) {
      update({url: e.target.value})
    }
  })

})
