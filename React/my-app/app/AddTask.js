import { useState } from "react";
import { useTasksDispatch } from "./TaskContext";
let nextId = 3;

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useTasksDispatch();

  return (
    <>
      <input placeholder="Add task" value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => {
        dispatch({
          type: 'added',
          id: nextId++,
          text: text
        });
        setText('');
      }}>Add Task</button>
    </>
  )
}