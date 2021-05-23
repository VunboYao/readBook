import { UPDATE_TASK, ADD_TASK } from './constant'

export const update = data => ({ type: UPDATE_TASK, data })
export const add = data => ({ type: ADD_TASK, data })
