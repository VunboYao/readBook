import { useState } from "react";
import { useTasksDispatch, useTasks } from "./TaskContext";

export default function TaskList() {
  const tasks = useTasks();

  return (
    <ul>
      {
        tasks.map(tasks => (
          <li key={tasks.id}>
            <Tasks task={tasks} />
          </li>
        ))
      }
    </ul>
  )
}

function Tasks({task}) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();
  let taskContent

  if (isEditing) {
    taskContent = (
      <>
        <input value={task.text} onChange={e => {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              text: e.target.value
            }
          })
        }} />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </> 
    )
  } else {
    taskContent = (
      <>
        <span>{task.text}</span>
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    )
  }

  return (
    <label>
      <input type="checkbox" checked={task.done} onChange={e => {
        dispatch({
          type: 'changed',
          task: {
            ...task,
            done: e.target.checked
          }
        })
      }} />
      {taskContent}
      <button onClick={() => dispatch({ type: 'deleted', id: task.id })}>Delete</button>
    </label>
  )
}