import {utils} from "./utils";


utils()
if (module.hot) {
  module.hot.accept('./utils.js', () => {
    console.log('updating')
    utils()
  })
}
