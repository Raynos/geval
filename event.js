module.exports = Event
function Event() {
    var listeners = []

    return { broadcast: broadcast, listen: event }

    function broadcast(value) {
        var listenersCopy = listeners.slice()
        for (var i = 0; i < listenersCopy.length; i++) {
            if (!listenersCopy[i].deleted) {
                listenersCopy[i].fn(value)
            }
        }
    }

    function event(listener) {
        listeners.push(new ListItem(listener))

        return removeListener

        function removeListener() {
            for (var i = 0; i < listeners.length; i++) {
                if (listeners[i].fn === listener) {
                    listeners[i].deleted = true
                    listeners.splice(i, 1)
                    break
                }
            }
        }
    }
}

function ListItem(fn) {
    this.fn = fn
    this.deleted = false
}
