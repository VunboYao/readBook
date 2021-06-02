import { createStore } from 'redux'
import Count from './reducer'

export default createStore(Count, [{ id: 100, name: 'nb', age: 10 }])
