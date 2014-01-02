type Event<T> := (listener: (T) => void) =>
    removeListener: () => void

geval/source := (broadcast: (T) => void) => Event<T>

geval/event := () => {
    listen: Event<T>,
    broadcast: (T) => void
}
