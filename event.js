module.exports = Event

function Event() {
    var listeners = []
    var listenersToBroadcast = []

    return { broadcast: broadcast, listen: event }

    function broadcast(value) {
        listenersToBroadcast = listeners.slice()
        // don't use indexes, this list can be edited while handlers are running
        while (listenersToBroadcast.length) {
            listenersToBroadcast.shift()(value)
        }
    }

    function event(listener) {
        listeners.push(listener)

        return removeListener

        function removeListener() {
            var index = listeners.indexOf(listener)
            if (index !== -1) {
                listeners.splice(index, 1)
            }
            // if we're mid-broadcast then remove handlers that have not yet fired
            index = listenersToBroadcast.indexOf(listener)
            if (index !== -1) {
                listenersToBroadcast.splice(index, 1)
            }
        }
    }
}
