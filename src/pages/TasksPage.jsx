import { useState, useEffect } from 'react';
import { getTasks } from '../services/taskService';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchTasks = async () => {
    const data = await getTasks(user.id);
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

 

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <TaskForm fetchTasks={fetchTasks} />
        <TaskList tasks={tasks} fetchTasks={fetchTasks} />
      </div>
    </div>
  );
};

export default TasksPage;
