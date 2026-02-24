import { useState } from "react";
 
function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
 
  const addTask = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
    setText("");
  };
 
  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };
 
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };
 
  const startEdit = (id) => {
    const value = prompt("Edit task:");
    if (value !== null && value.trim()) {
      setTasks(tasks.map(t => t.id === id ? { ...t, text: value } : t));
    }
  };
 
  return (
    <div>
      <h2>Task App</h2>
 
      <form onSubmit={addTask}>
        <input 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add task"
        />
        <button>Add</button>
      </form>
 
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input 
              type="checkbox" 
              checked={task.done} 
              onChange={() => toggleTask(task.id)} 
            />
            {task.text}
            <button onClick={() => startEdit(task.id)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
 
export default App;