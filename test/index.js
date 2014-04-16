var test = require("tape")
var process = require("process")

var EventSource = require("../source.js")
var Event = require("../event.js")
var Single = require("../single.js")
var Multiple = require("../multiple.js")

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

test("single", function (assert) {
    var ev = Single()
    var results = []

    ev(function (v) {
        results.push(v)
    })

    ev(1)
    ev(2)

    assert.deepEqual(results, [1, 2])
    assert.end()
})

test("multiple", function (assert) {
    var events = Multiple(["one", "two"])
    var results = []

    events.one(function (v) {
        results.push(["one", v])
    })
    events.two(function (v) {
        results.push(["two", v])
    })

    events.one(1)
    events.two(2)
    events.two(3)
    events.one(4)
    events.one(5)

    assert.deepEqual(results, [
        ["one", 1], ["two", 2], ["two", 3], ["one", 4], ["one", 5]
    ])
    assert.end()
})



















