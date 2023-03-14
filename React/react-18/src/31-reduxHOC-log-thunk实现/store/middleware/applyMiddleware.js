export function applyMiddleware(store, ...args) {
  args.forEach((fn) => {
    fn(store)
  })
}
