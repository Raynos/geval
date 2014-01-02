# geval

[![build status][1]][2]
[![NPM version][3]][4]
[![Coverage Status][5]][6]
[![Davis Dependency status][9]][10]

[![browser support][11]][12]

An implementation of an event

## Example

```js
var Event = require("geval/source")
var document = require("global/document")

var clicks = Event(function (broadcast) {
    document.addEventListener("click", function (ev) {
        broadcast(ev)
    })
})

var removeListener = clicks(function listener(ev) {
    console.log('click happened', ev)
})

// later you can call `removeListener()` to stop listening to events
```

## Mutable events

```js
var EventMutable = require("geval/mutable")
var document = require("global/document")

var clicks = EventMutable()
document.addEventListener("click", function (ev) {
    clicks.broadcast(ev)
})

var removeListener = clicks(function listener(ev) {
    console.log('click happened', ev)
})

// later you can call `removeListener()` to stop listening to events
```

## Motivation

EventEmitter's are complex. They are duplexed events by default

`Event` is the simpler version of an `EventEmitter`

The main differences are:
  
  - just one event.
  - no implicit string based events
  - forces explicit interfaces with named properties that are
      `Event`'s
  - no inheritance
  - `Event` interface only has public listening functionality,
      this gives a clear seperation between broadcast and listen

Instead of something like

```js
var EventEmitter = require('events').EventEmitter

var stream = new EventEmitter()

stream.on('data', onData)
stream.on('end', onEnd)
stream.on('close', onClose)
```

you can do:

```js
var Event = require('geval/mutable')

var stream = {
  ondata: Event(),
  onend: Event(),
  onclose: Event()
}

stream.ondata(onData)
stream.onend(onEnd)
stream.onclose(onClose)
```

## Installation

`npm install geval`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/geval.png
  [2]: https://travis-ci.org/Raynos/geval
  [3]: https://badge.fury.io/js/geval.png
  [4]: https://badge.fury.io/js/geval
  [5]: https://coveralls.io/repos/Raynos/geval/badge.png
  [6]: https://coveralls.io/r/Raynos/geval
  [7]: https://gemnasium.com/Raynos/geval.png
  [8]: https://gemnasium.com/Raynos/geval
  [9]: https://david-dm.org/Raynos/geval.png
  [10]: https://david-dm.org/Raynos/geval
  [11]: https://ci.testling.com/Raynos/geval.png
  [12]: https://ci.testling.com/Raynos/geval
