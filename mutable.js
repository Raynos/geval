module.exports = Mutable

function Mutable() {
    var listeners = []

    event.broadcast = broadcast

    return event

    function broadcast(value) {
        for (var i = 0; i < listeners.length; i++) {
            listeners[i](value)
        }
    }

    function event(listener) {
        listeners.push(listener)

        return removeListener

        function removeListener() {
            var index = listeners.indexOf(listener)
            if (index !== -1) {
                listeners.splice(index, -1)
            }
        }
    }
}
