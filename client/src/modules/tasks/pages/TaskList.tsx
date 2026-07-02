import { useEffect, useState } from 'react';
import { apiClient as api } from '../../../services/apiClient';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  priority: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/tasks')
      .then(res => { setTasks(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-gray-500 mt-2">Manage your to-do items and follow-ups.</p>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center text-gray-500 py-12 animate-pulse">Loading Tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="text-center text-gray-500 bg-surface rounded-xl border border-border p-12 shadow-sm">
          No tasks found.
        </div>
      ) : (
        <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-600">Title</th>
                <th className="px-6 py-4 font-medium text-gray-600">Due Date</th>
                <th className="px-6 py-4 font-medium text-gray-600">Status</th>
                <th className="px-6 py-4 font-medium text-gray-600">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tasks.map(task => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{task.title}</td>
                  <td className="px-6 py-4 text-gray-500">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                      {task.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
