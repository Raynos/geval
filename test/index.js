var test = require("tape")

var geval = require("../index")

test("geval is a function", function (assert) {
    assert.equal(typeof geval, "function")
    assert.end()
})
