var Event = require('./event.js')

module.exports = Source

function Source(broadcaster) {
    var tuple = Event()

    broadcaster(tuple.broadcast)

    return tuple.listen
}
