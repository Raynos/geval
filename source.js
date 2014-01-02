var Mutable = require('./mutable.js')

module.exports = Source

function Source(broadcaster) {
    var event = Mutable()
    var broadcast = event.broadcast
    delete event.broadcast

    broadcaster(broadcast)

    return event
}
