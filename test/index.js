var test = require("tape")
var process = require("process")

var EventSource = require("../source.js")
var Event = require("../event.js")

var END = {}

test("Event is a function", function (assert) {
    assert.equal(typeof EventSource, "function")
    assert.equal(typeof Event, "function")
    assert.end()
})

test("EventSource works", function (assert) {
    var values = [1, 2, 3, END]
    var results = []

    var event = EventSource(function (broadcast) {
        process.nextTick(function () {
            values.forEach(broadcast)
        })
    })
    assert.equal(typeof event, "function")
    event(listener)

    assert.equal("broadcast" in event, false)

    function listener(value) {
        if (value === END) {
            return end()
        }

        results.push(value)
    }

    function end() {
        assert.deepEqual(results, [1, 2, 3])
        assert.end()
    }
})

test("Event works", function (assert) {
    var values = [1, 2, 3, END, 4]
    var results = []

    var event = Event()
    assert.equal(typeof event.listen, "function")

    var removeListener = event.listen(listener)
    assert.equal(typeof removeListener, "function")

    assert.equal("broadcast" in event, true)
    assert.equal(typeof event.broadcast, "function")

    values.forEach(event.broadcast)

    assert.deepEqual(results, [1, 2, 3])
    assert.end()

    function listener(value) {
        if (value === END) {
            return removeListener()
        }

        results.push(value)
    }
})
