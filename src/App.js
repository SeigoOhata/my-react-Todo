import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [comments, setComments] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  // ──────────────────────────────────────────
  // LocalStorage: 初回読み込み
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    const savedCompleted = JSON.parse(localStorage.getItem('completed')) || [];
    setTasks(savedTasks);
    setComments(savedComments);
    setCompleted(savedCompleted);
  }, []);

  // LocalStorage: 変更があったら保存
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('comments', JSON.stringify(comments));
    localStorage.setItem('completed', JSON.stringify(completed));
  }, [tasks, comments, completed]);

  // ──────────────────────────────────────────
  // ハンドラ
  const handleCommentChange = (e, index) => {
    const newComments = [...comments];
    newComments[index] = e.target.value;
    setComments(newComments);
  };

  const addTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, task]);
    setComments([...comments, '']);
    setCompleted([...completed, false]);
    setTask('');
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    const newComments = comments.filter((_, i) => i !== index);
    const newCompleted = completed.filter((_, i) => i !== index);
    setTasks(newTasks);
    setComments(newComments);
    setCompleted(newCompleted);
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index]);
  };

  const saveEdit = () => {
    if (editingIndex === null) return;
    const newTasks = [...tasks];
    newTasks[editingIndex] = editingText;
    setTasks(newTasks);
    setEditingIndex(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingText('');
  };

  const toggleComplete = (index) => {
    const newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index];
    setCompleted(newCompleted);
  };

  // ──────────────────────────────────────────
  // JSX
  return (
    <div className="App" style={{ padding: '24px' }}>
      <h1>今日のやることリスト</h1>

      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="新しいタスクを入力"
          style={{ width: '300px', height: '40px', fontSize: '16px' }}
        />
        <button
          onClick={addTask}
          style={{ padding: '7px 15px', fontSize: '16px', marginLeft: '8px' }}
        >
          追加
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>完了</th>
            <th>#</th>
            <th>タスク</th>
            <th>操作</th>
            <th>コメント</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={completed[index] || false}
                  onChange={() => toggleComplete(index)}
                />
              </td>
              <td>{index + 1}</td>
              <td
                style={{
                  textDecoration: completed[index] ? 'line-through' : 'none',
                }}
              >
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
                  value={comments[index] || ''}
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
