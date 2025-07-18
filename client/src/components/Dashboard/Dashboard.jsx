import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as taskService from '../../services/taskService';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    categoryCounts: {},
    oldTasksCounts: {}
  });

  const countOpenSubtasks = (subtasks) =>
    subtasks.filter(st => st.status !== 'Completed' && st.status !== 'Cancelled').length;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await taskService.index();
        const userTasks = fetchedTasks.filter(
          (task) => task.author && task.author._id === user._id
        );
        setTasks(userTasks);
        calculateStats(userTasks);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    if (user) fetchTasks();
  }, [user]);

  const calculateStats = (tasks) => {
    const categoryCounts = {};
    const oldTasksCounts = {};
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 5);

    tasks.forEach(task => {
      const category = task.category || 'Uncategorized';


      if (!categoryCounts[category]) {
        categoryCounts[category] = 0;
      }
      categoryCounts[category]++;


      if (new Date(task.createdAt) < thirtyDaysAgo) {
        if (!oldTasksCounts[category]) {
          oldTasksCounts[category] = 0;
        }
        oldTasksCounts[category]++;
      }
    });

    setStats({
      totalTasks: tasks.length,
      categoryCounts,
      oldTasksCounts
    });
  };

  return (

    // <div className="newGrid">
    <div className="taskGridWrap">

      <div className="gridShell">
        <p className="stats-title">Tasks by Category</p>
        <table className="statsTable">
          <thead>
            <tr>
              <th>Category</th>
              <th>Count</th>
              <th>Open Subtasks</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(stats.categoryCounts).map((category) => {
              const categoryTasks = tasks.filter(task => (task.category || 'Uncategorized') === category);
              const totalOpenSubtasks = categoryTasks.reduce((total, task) => {
                return total + (task.subtasks && task.subtasks.length > 0 ? countOpenSubtasks(task.subtasks) : 0);
              }, 0);

              return (
                <tr key={category}>
                  <td>{category}</td>
                  <td>{stats.categoryCounts[category]}</td>
                  <td>{totalOpenSubtasks || '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="gridShell">
        <p className="stats-title">Tasks Older Than 5 Days</p>
        <table className="gridInternal">
          <thead>
            <tr>
              <th>Category</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(stats.oldTasksCounts).map((category) => (
              <tr key={category}>
                <td>{category}</td>
                <td>{stats.oldTasksCounts[category]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    // </div>
  );
};

export default Dashboard;
