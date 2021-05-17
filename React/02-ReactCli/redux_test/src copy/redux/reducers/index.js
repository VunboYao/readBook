import { combineReducers } from 'redux'
// 引入reducer
import Count from './Count'
import Person from './Person'

export default combineReducers({ Count, Person })
