import {useState} from 'react';
import './App.css';
import logo from './logo.svg';


function App(){
  const[task, setTask ] = useState('');
  const[tasks, setTasks] = useState([]);

  const addTask = () => {
    if(task.trim()==='')return;
    setTasks([...tasks,task]);
    setTask('');
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);};

  return(
    <div className='App'>
      <h1>今日のやること</h1>
      <input
      type="text"
      value={task}
      onChange={(e)=>setTask(e.target.value)}
      placeholder="新しいタスクを入力"
      />
      <button onClick={addTask}>追加</button>
      


      <ul>
  {tasks.map((task, index) => (
    <li key={index} className="task-item">
      ✅ {task}
      <button onClick={() => deleteTask(index)}>削除</button>
    </li>
  ))}
</ul>

     <img src={logo} className="App-logo" alt="ロゴ" />
    </div>
  );


}

export default App;