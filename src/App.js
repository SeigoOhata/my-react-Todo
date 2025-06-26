import {useState} from 'react';
import './App.css';
import logo from './logo.svg';


function App(){
  const[task, setTask ] = useState('');
  const[tasks, setTasks] = useState([]);
  const[editingIndex, setEditingIndex] = useState(null);
  const[editingText, setEditingText] = useState('');
  const [comments, setComments] = useState([]); 

  const handleCommentChange = (e, index) => {
  const newComments = [...comments];
  newComments[index] = e.target.value;
  setComments(newComments);
};

  const addTask = () => {
    if(task.trim()==='')return;
    setTasks([...tasks,task]);
    setComments([...comments, '']); 
    setTask('');
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    const newComments = comments.filter((_, i) => i !== index);
    setTasks(newTasks);
    setComments(newComments);};

    const startEdit = (index) => {
      setEditingIndex(index);
      setEditingText(tasks[index]);
    };

    const saveEdit = () => {
      const newTasks = [...tasks];
      newTasks[editingIndex] = editingText;
      setTasks(newTasks);
      setEditingIndex(null);
      setEditingText('');
    };

    const cancelEdit = () =>
    {
      setEditingIndex(null);
      setEditingText('');
    };

  return(
    <div className='App'>
     <h1 style={{ marginRight: '16px' }}>今日のやることリスト</h1>
      <input
      type="text"
      value={task}
      onChange={(e)=>setTask(e.target.value)}
      placeholder="新しいタスクを入力"
      style={{ width: '300px', height: '40px', fontSize: '16px' }}
      />
      <button onClick={addTask}
      style={{ padding: '7px 15px', fontSize: '16px', marginLeft: '8px' }}
      >追加</button>
      
      


      <table>
      <thead>
  <tr>
    <th>#</th>
    <th>タスク</th>
    <th>操作</th>
    <th>コメント</th>
  </tr>
</thead>
<tbody>
  {tasks.map((t, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>
        {editingIndex === index ? (
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
          />
        ) : (
          t
        )}
      </td>
      <td>
        {editingIndex === index ? (
          <>
            <button onClick={saveEdit}>保存</button>
            <button onClick={cancelEdit}>キャンセル</button>
          </>
        ) : (
          <>
            <button onClick={() => startEdit(index)}>編集</button>
            <button onClick={() => deleteTask(index)}>削除</button>
          </>
        )}
      </td>
      <td>
        <input
          type="text"
          value={comments[index] || ""}
          onChange={(e) => handleCommentChange(e, index)}
          placeholder="コメントを入力"
          style={{ width: '500px', height: '20px', fontSize: '16px' }}
        />
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}

export default App;