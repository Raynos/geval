var test = require("tape")
var process = require("process")

var EventSource = require("../source.js")
var EventMutable = require("../mutable.js")

var END = {}

test("Event is a function", function (assert) {
    assert.equal(typeof EventSource, "function")
    assert.equal(typeof EventMutable, "function")
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

test("EventMutable works", function (assert) {
    var values = [1, 2, 3, END, 4]
    var results = []

    var event = EventMutable()
    assert.equal(typeof event, "function")

    var removeListener = event(listener)
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
